import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GoogleProvider } from './providers/google.provider';
import { FacebookProvider } from './providers/facebook.provider';
import { StorageService } from './storage.service';
import { DataCleanerService } from './data-cleaner.service';
import { ScrapeTarget } from './entities/scrape-target.entity';
import { SystemSetting } from './entities/system-setting.entity';
import { AddScrapeTargetDto, UpdateScrapeTargetDto } from './dto/scraper.dto';
export declare class ScraperService implements OnModuleInit {
    private readonly googleProvider;
    private readonly facebookProvider;
    private readonly storageService;
    private readonly dataCleanerService;
    private readonly scrapeTargetRepo;
    private readonly systemSettingRepo;
    private readonly logger;
    private isProcessing;
    private queue;
    constructor(googleProvider: GoogleProvider, facebookProvider: FacebookProvider, storageService: StorageService, dataCleanerService: DataCleanerService, scrapeTargetRepo: Repository<ScrapeTarget>, systemSettingRepo: Repository<SystemSetting>);
    onModuleInit(): Promise<void>;
    handleDailyScraping(): Promise<void>;
    private runScraperIfEnabled;
    triggerScrape(type: string, keyword: string): Promise<void>;
    getTargets(): Promise<ScrapeTarget[]>;
    addTarget(dto: AddScrapeTargetDto): Promise<ScrapeTarget>;
    updateTarget(id: string, dto: UpdateScrapeTargetDto): Promise<ScrapeTarget | null>;
    deleteTarget(id: string): Promise<{
        deleted: boolean;
    }>;
    getJobStatus(): Promise<{
        enabled: boolean;
    }>;
    toggleJob(enabled: boolean): Promise<{
        enabled: boolean;
    }>;
    private processQueue;
}
