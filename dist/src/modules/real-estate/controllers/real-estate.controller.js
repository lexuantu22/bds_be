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
exports.RealEstateController = void 0;
const common_1 = require("@nestjs/common");
const real_estate_service_1 = require("../services/real-estate.service");
const create_real_estate_dto_1 = require("../dto/create-real-estate.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_access_guard_1 = require("../../auth/guards/jwt-access.guard");
const public_decorator_1 = require("../../auth/decorators/public.decorator");
let RealEstateController = class RealEstateController {
    realEstateService;
    constructor(realEstateService) {
        this.realEstateService = realEstateService;
    }
    create(createRealEstateDto) {
        return this.realEstateService.create(createRealEstateDto);
    }
    findAll(page = 1, limit = 10, search, type, status, category) {
        return this.realEstateService.findAll(Number(page), Number(limit), search, type, status, category);
    }
    findOne(id) {
        return this.realEstateService.findOne(id);
    }
    remove(id) {
        return this.realEstateService.remove(id);
    }
};
exports.RealEstateController = RealEstateController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new real estate post (Admin only)' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The post has been successfully created.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_real_estate_dto_1.CreateRealEstateDto]),
    __metadata("design:returntype", void 0)
], RealEstateController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all real estate posts with pagination and filters' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('type')),
    __param(4, (0, common_1.Query)('status')),
    __param(5, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    __metadata("design:returntype", void 0)
], RealEstateController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a real estate post by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RealEstateController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a real estate post by id (Admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RealEstateController.prototype, "remove", null);
exports.RealEstateController = RealEstateController = __decorate([
    (0, swagger_1.ApiTags)('real-estate'),
    (0, common_1.Controller)('real-estate'),
    __metadata("design:paramtypes", [real_estate_service_1.RealEstateService])
], RealEstateController);
//# sourceMappingURL=real-estate.controller.js.map