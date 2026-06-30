"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScraperModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const scraper_service_1 = require("./scraper.service");
const scraper_controller_1 = require("./scraper.controller");
const google_provider_1 = require("./providers/google.provider");
const facebook_provider_1 = require("./providers/facebook.provider");
const storage_service_1 = require("./storage.service");
const data_cleaner_service_1 = require("./data-cleaner.service");
const real_estate_post_entity_1 = require("./entities/real-estate-post.entity");
const scrape_target_entity_1 = require("./entities/scrape-target.entity");
const system_setting_entity_1 = require("./entities/system-setting.entity");
let ScraperModule = class ScraperModule {
};
exports.ScraperModule = ScraperModule;
exports.ScraperModule = ScraperModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([real_estate_post_entity_1.RealEstatePost, scrape_target_entity_1.ScrapeTarget, system_setting_entity_1.SystemSetting])],
        controllers: [scraper_controller_1.ScraperController],
        providers: [
            scraper_service_1.ScraperService,
            storage_service_1.StorageService,
            data_cleaner_service_1.DataCleanerService,
            google_provider_1.GoogleProvider,
            facebook_provider_1.FacebookProvider,
        ],
    })
], ScraperModule);
//# sourceMappingURL=scraper.module.js.map