import { ScraperService } from './scraper.service';
import { AddScrapeTargetDto, UpdateScrapeTargetDto, ToggleScraperJobDto } from './dto/scraper.dto';
export declare class ScraperController {
    private readonly scraperService;
    constructor(scraperService: ScraperService);
    triggerScraping(body: {
        type: 'batdongsan' | 'facebook';
        keyword: string;
    }): Promise<{
        message: string;
    }>;
    getTargets(): Promise<import("./entities/scrape-target.entity").ScrapeTarget[]>;
    addTarget(dto: AddScrapeTargetDto): Promise<import("./entities/scrape-target.entity").ScrapeTarget>;
    updateTarget(id: string, dto: UpdateScrapeTargetDto): Promise<import("./entities/scrape-target.entity").ScrapeTarget | null>;
    deleteTarget(id: string): Promise<{
        deleted: boolean;
    }>;
    getJobStatus(): Promise<{
        enabled: boolean;
    }>;
    toggleJob(dto: ToggleScraperJobDto): Promise<{
        enabled: boolean;
    }>;
}
