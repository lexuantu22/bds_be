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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScraperController = void 0;
const common_1 = require("@nestjs/common");
const scraper_service_1 = require("./scraper.service");
const scraper_dto_1 = require("./dto/scraper.dto");
let ScraperController = class ScraperController {
    scraperService;
    constructor(scraperService) {
        this.scraperService = scraperService;
    }
    async triggerScraping(body) {
        await this.scraperService.triggerScrape(body.type, body.keyword);
        return { message: 'Scraping job added to queue successfully.' };
    }
    async getTargets() {
        return this.scraperService.getTargets();
    }
    async addTarget(dto) {
        return this.scraperService.addTarget(dto);
    }
    async updateTarget(id, dto) {
        return this.scraperService.updateTarget(id, dto);
    }
    async deleteTarget(id) {
        return this.scraperService.deleteTarget(id);
    }
    async getJobStatus() {
        return this.scraperService.getJobStatus();
    }
    async toggleJob(dto) {
        return this.scraperService.toggleJob(dto.enabled);
    }
};
exports.ScraperController = ScraperController;
__decorate([
    (0, common_1.Post)('trigger'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScraperController.prototype, "triggerScraping", null);
__decorate([
    (0, common_1.Get)('targets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScraperController.prototype, "getTargets", null);
__decorate([
    (0, common_1.Post)('targets'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [scraper_dto_1.AddScrapeTargetDto]),
    __metadata("design:returntype", Promise)
], ScraperController.prototype, "addTarget", null);
__decorate([
    (0, common_1.Put)('targets/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, scraper_dto_1.UpdateScrapeTargetDto]),
    __metadata("design:returntype", Promise)
], ScraperController.prototype, "updateTarget", null);
__decorate([
    (0, common_1.Delete)('targets/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScraperController.prototype, "deleteTarget", null);
__decorate([
    (0, common_1.Get)('settings/job-status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScraperController.prototype, "getJobStatus", null);
__decorate([
    (0, common_1.Post)('settings/toggle-job'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [scraper_dto_1.ToggleScraperJobDto]),
    __metadata("design:returntype", Promise)
], ScraperController.prototype, "toggleJob", null);
exports.ScraperController = ScraperController = __decorate([
    (0, common_1.Controller)('scraper'),
    __metadata("design:paramtypes", [scraper_service_1.ScraperService])
], ScraperController);
//# sourceMappingURL=scraper.controller.js.map