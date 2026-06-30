import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { GoogleProvider } from './providers/google.provider';
import { FacebookProvider } from './providers/facebook.provider';
import { StorageService } from './storage.service';
import { DataCleanerService } from './data-cleaner.service';
import { RealEstatePost } from './entities/real-estate-post.entity';
import { ScrapeTarget } from './entities/scrape-target.entity';
import { SystemSetting } from './entities/system-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RealEstatePost, ScrapeTarget, SystemSetting])],
  controllers: [ScraperController],
  providers: [
    ScraperService,
    StorageService,
    DataCleanerService,
    GoogleProvider,
    FacebookProvider,
  ],
})
export class ScraperModule {}
