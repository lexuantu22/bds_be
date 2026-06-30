"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ScraperService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScraperService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const google_provider_1 = require("./providers/google.provider");
const facebook_provider_1 = require("./providers/facebook.provider");
const storage_service_1 = require("./storage.service");
const data_cleaner_service_1 = require("./data-cleaner.service");
const scrape_target_entity_1 = require("./entities/scrape-target.entity");
const system_setting_entity_1 = require("./entities/system-setting.entity");
let ScraperService = ScraperService_1 = class ScraperService {
    googleProvider;
    facebookProvider;
    storageService;
    dataCleanerService;
    scrapeTargetRepo;
    systemSettingRepo;
    logger = new common_1.Logger(ScraperService_1.name);
    isProcessing = false;
    queue = [];
    constructor(googleProvider, facebookProvider, storageService, dataCleanerService, scrapeTargetRepo, systemSettingRepo) {
        this.googleProvider = googleProvider;
        this.facebookProvider = facebookProvider;
        this.storageService = storageService;
        this.dataCleanerService = dataCleanerService;
        this.scrapeTargetRepo = scrapeTargetRepo;
        this.systemSettingRepo = systemSettingRepo;
    }
    async onModuleInit() {
        this.logger.log('Kiểm tra trạng thái tự động cào dữ liệu lúc khởi động...');
        await this.runScraperIfEnabled();
    }
    async handleDailyScraping() {
        this.logger.log('Khởi chạy tiến trình cào dữ liệu định kỳ mỗi đêm...');
        await this.runScraperIfEnabled();
    }
    async runScraperIfEnabled() {
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
    async triggerScrape(type, keyword) {
        this.logger.log(`Added job to memory queue: ${type} - ${keyword}`);
        this.queue.push({ type, keyword });
        this.processQueue();
    }
    async getTargets() {
        return this.scrapeTargetRepo.find({ order: { createdAt: 'DESC' } });
    }
    async addTarget(dto) {
        const target = this.scrapeTargetRepo.create(dto);
        return this.scrapeTargetRepo.save(target);
    }
    async updateTarget(id, dto) {
        await this.scrapeTargetRepo.update(id, dto);
        return this.scrapeTargetRepo.findOne({ where: { id } });
    }
    async deleteTarget(id) {
        await this.scrapeTargetRepo.delete(id);
        return { deleted: true };
    }
    async getJobStatus() {
        const setting = await this.systemSettingRepo.findOne({ where: { key: 'scraper_job_enabled' } });
        const isEnabled = setting ? setting.value === 'true' : false;
        return { enabled: isEnabled };
    }
    async toggleJob(enabled) {
        let setting = await this.systemSettingRepo.findOne({ where: { key: 'scraper_job_enabled' } });
        if (!setting) {
            setting = this.systemSettingRepo.create({ key: 'scraper_job_enabled', value: String(enabled) });
        }
        else {
            setting.value = String(enabled);
        }
        await this.systemSettingRepo.save(setting);
        return { enabled };
    }
    async processQueue() {
        if (this.isProcessing || this.queue.length === 0) {
            return;
        }
        this.isProcessing = true;
        while (this.queue.length > 0) {
            const job = this.queue.shift();
            if (!job)
                break;
            this.logger.log(`Processing job: [${job.type}] ${job.url || job.keyword}`);
            try {
                let result = [];
                if (job.type === 'google') {
                    result = await this.googleProvider.scrape(job.url || job.keyword || '');
                }
                else if (job.type === 'facebook') {
                    result = await this.facebookProvider.scrape(job.keyword || job.url || '');
                }
                this.logger.log(`Job completed. Extracted ${result.length} items.`);
                if (result.length > 0) {
                    const cleanedData = this.dataCleanerService.clean(result);
                    await this.storageService.saveItems(cleanedData);
                }
                await new Promise((resolve) => setTimeout(resolve, 3000));
            }
            catch (error) {
                this.logger.error(`Error processing job ${job.type}:`, error.stack);
            }
        }
        this.isProcessing = false;
    }
};
exports.ScraperService = ScraperService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScraperService.prototype, "handleDailyScraping", null);
exports.ScraperService = ScraperService = ScraperService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, typeorm_1.InjectRepository)(scrape_target_entity_1.ScrapeTarget)),
    __param(5, (0, typeorm_1.InjectRepository)(system_setting_entity_1.SystemSetting)),
    __metadata("design:paramtypes", [google_provider_1.GoogleProvider,
        facebook_provider_1.FacebookProvider,
        storage_service_1.StorageService,
        data_cleaner_service_1.DataCleanerService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ScraperService);
//# sourceMappingURL=scraper.service.js.map