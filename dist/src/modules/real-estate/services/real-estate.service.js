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
exports.RealEstateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const real_estate_post_entity_1 = require("../entities/real-estate-post.entity");
let RealEstateService = class RealEstateService {
    realEstateRepository;
    constructor(realEstateRepository) {
        this.realEstateRepository = realEstateRepository;
    }
    async create(createRealEstateDto) {
        const newPost = this.realEstateRepository.create(createRealEstateDto);
        return this.realEstateRepository.save(newPost);
    }
    async findAll() {
        return this.realEstateRepository.find({ order: { createdAt: 'DESC' } });
    }
    async findOne(id) {
        const post = await this.realEstateRepository.findOne({ where: { id } });
        if (!post) {
            throw new common_1.NotFoundException(`Real estate post with ID ${id} not found`);
        }
        return post;
    }
    async remove(id) {
        const result = await this.realEstateRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Real estate post with ID ${id} not found`);
        }
    }
};
exports.RealEstateService = RealEstateService;
exports.RealEstateService = RealEstateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(real_estate_post_entity_1.RealEstatePost)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RealEstateService);
//# sourceMappingURL=real-estate.service.js.map