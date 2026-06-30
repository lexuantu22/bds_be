import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { AddScrapeTargetDto, UpdateScrapeTargetDto, ToggleScraperJobDto } from './dto/scraper.dto';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Post('trigger')
  async triggerScraping(
    @Body() body: { type: 'batdongsan' | 'facebook'; keyword: string },
  ) {
    await this.scraperService.triggerScrape(body.type, body.keyword);
    return { message: 'Scraping job added to queue successfully.' };
  }

  // --- Scrape Targets API ---
  @Get('targets')
  async getTargets() {
    return this.scraperService.getTargets();
  }

  @Post('targets')
  async addTarget(@Body() dto: AddScrapeTargetDto) {
    return this.scraperService.addTarget(dto);
  }

  @Put('targets/:id')
  async updateTarget(
    @Param('id') id: string,
    @Body() dto: UpdateScrapeTargetDto,
  ) {
    return this.scraperService.updateTarget(id, dto);
  }

  @Delete('targets/:id')
  async deleteTarget(@Param('id') id: string) {
    return this.scraperService.deleteTarget(id);
  }

  // --- Scraper Settings API ---
  @Get('settings/job-status')
  async getJobStatus() {
    return this.scraperService.getJobStatus();
  }

  @Post('settings/toggle-job')
  async toggleJob(@Body() dto: ToggleScraperJobDto) {
    return this.scraperService.toggleJob(dto.enabled);
  }
}
