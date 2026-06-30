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
var StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const real_estate_post_entity_1 = require("./entities/real-estate-post.entity");
let StorageService = StorageService_1 = class StorageService {
    postRepository;
    logger = new common_1.Logger(StorageService_1.name);
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async saveItems(items) {
        if (!items || items.length === 0)
            return;
        try {
            const saved = await this.postRepository.save(items);
            this.logger.log(`Successfully saved ${saved.length} items to Postgres DB`);
        }
        catch (error) {
            this.logger.error('Error saving to DB:', error.message);
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(real_estate_post_entity_1.RealEstatePost)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StorageService);
//# sourceMappingURL=storage.service.js.map