import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleProvider } from './providers/google.provider';
import { FacebookProvider } from './providers/facebook.provider';
import { StorageService } from './storage.service';
import { DataCleanerService } from './data-cleaner.service';
import { ScrapeTarget } from './entities/scrape-target.entity';
import { SystemSetting } from './entities/system-setting.entity';
import { AddScrapeTargetDto, UpdateScrapeTargetDto } from './dto/scraper.dto';

@Injectable()
export class ScraperService implements OnModuleInit {
  private readonly logger = new Logger(ScraperService.name);

  private isProcessing = false;
  private queue: { type: string; keyword?: string; url?: string }[] = [];

  constructor(
    private readonly googleProvider: GoogleProvider,
    private readonly facebookProvider: FacebookProvider,
    private readonly storageService: StorageService,
    private readonly dataCleanerService: DataCleanerService,
    @InjectRepository(ScrapeTarget)
    private readonly scrapeTargetRepo: Repository<ScrapeTarget>,
    @InjectRepository(SystemSetting)
    private readonly systemSettingRepo: Repository<SystemSetting>,
  ) {}

  async onModuleInit() {
    this.logger.log('Kiểm tra trạng thái tự động cào dữ liệu lúc khởi động...');
    await this.runScraperIfEnabled();
  }

  // Chạy tự động mỗi ngày vào lúc 00:00 (Nửa đêm)
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailyScraping() {
    this.logger.log('Khởi chạy tiến trình cào dữ liệu định kỳ mỗi đêm...');
    await this.runScraperIfEnabled();
  }

  private async runScraperIfEnabled() {
    const isEnabled = await this.getJobStatus();
    if (!isEnabled.enabled) {
      this.logger.log('Cron Job cào dữ liệu đang bị TẮT trong cài đặt.');
      return;
    }

    const activeTargets = await this.scrapeTargetRepo.find({ where: { isActive: true } });
    if (activeTargets.length === 0) {
      this.logger.log('Không có URL nào đang active để cào.');
      return;
    }

    this.logger.log(`Nạp ${activeTargets.length} URLs vào hàng đợi...`);
    for (const target of activeTargets) {
      this.queue.push({ type: target.platform, url: target.url });
    }
    this.processQueue();
  }

  // Cũ: API Trigger thủ công
  async triggerScrape(type: string, keyword: string) {
    this.logger.log(`Added job to memory queue: ${type} - ${keyword}`);
    this.queue.push({ type, keyword });
    this.processQueue(); // Chạy ngầm không dùng await
  }

  // --- Scrape Targets API ---
  async getTargets() {
    return this.scrapeTargetRepo.find({ order: { createdAt: 'DESC' } });
  }

  async addTarget(dto: AddScrapeTargetDto) {
    const target = this.scrapeTargetRepo.create(dto);
    return this.scrapeTargetRepo.save(target);
  }

  async updateTarget(id: string, dto: UpdateScrapeTargetDto) {
    await this.scrapeTargetRepo.update(id, dto);
    return this.scrapeTargetRepo.findOne({ where: { id } });
  }

  async deleteTarget(id: string) {
    await this.scrapeTargetRepo.delete(id);
    return { deleted: true };
  }

  // --- Scraper Settings API ---
  async getJobStatus() {
    const setting = await this.systemSettingRepo.findOne({ where: { key: 'scraper_job_enabled' } });
    const isEnabled = setting ? setting.value === 'true' : false;
    return { enabled: isEnabled };
  }

  async toggleJob(enabled: boolean) {
    let setting = await this.systemSettingRepo.findOne({ where: { key: 'scraper_job_enabled' } });
    if (!setting) {
      setting = this.systemSettingRepo.create({ key: 'scraper_job_enabled', value: String(enabled) });
    } else {
      setting.value = String(enabled);
    }
    await this.systemSettingRepo.save(setting);
    return { enabled };
  }

  // Hàm xử lý hàng đợi tuần tự (thay thế cho BullMQ)
  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const job = this.queue.shift();
      if (!job) break;

      this.logger.log(`Processing job: [${job.type}] ${job.url || job.keyword}`);
      try {
        let result: any[] = [];
        if (job.type === 'google') {
          // If url is available, use it (we will modify googleProvider next)
          result = await this.googleProvider.scrape(job.url || job.keyword || '');
        } else if (job.type === 'facebook') {
          result = await this.facebookProvider.scrape(job.keyword || job.url || '');
        }
        this.logger.log(`Job completed. Extracted ${result.length} items.`);

        // Làm sạch dữ liệu và lưu vào Postgres Database
        if (result.length > 0) {
          const cleanedData = this.dataCleanerService.clean(result);
          await this.storageService.saveItems(cleanedData);
        }

        // Nghỉ ngơi 3 giây trước khi cào từ khóa tiếp theo
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (error) {
        this.logger.error(`Error processing job ${job.type}:`, error.stack);
      }
    }

    this.isProcessing = false;
  }
}

