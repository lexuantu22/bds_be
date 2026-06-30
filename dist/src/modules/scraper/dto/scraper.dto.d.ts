export declare class AddScrapeTargetDto {
    url: string;
    platform: string;
    isActive?: boolean;
}
export declare class UpdateScrapeTargetDto {
    url?: string;
    platform?: string;
    isActive?: boolean;
}
export declare class ToggleScraperJobDto {
    enabled: boolean;
}
