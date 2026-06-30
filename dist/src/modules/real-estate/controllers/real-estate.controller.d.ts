import { RealEstateService } from '../services/real-estate.service';
import { CreateRealEstateDto } from '../dto/create-real-estate.dto';
export declare class RealEstateController {
    private readonly realEstateService;
    constructor(realEstateService: RealEstateService);
    create(createRealEstateDto: CreateRealEstateDto): Promise<import("../entities/real-estate-post.entity").RealEstatePost>;
    findAll(page?: number, limit?: number, search?: string, type?: string, status?: string, category?: string): Promise<{
        data: import("../entities/real-estate-post.entity").RealEstatePost[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<import("../entities/real-estate-post.entity").RealEstatePost>;
    remove(id: string): Promise<void>;
}
