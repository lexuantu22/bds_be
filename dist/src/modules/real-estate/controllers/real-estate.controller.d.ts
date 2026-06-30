import { RealEstateService } from '../services/real-estate.service';
import { CreateRealEstateDto } from '../dto/create-real-estate.dto';
export declare class RealEstateController {
    private readonly realEstateService;
    constructor(realEstateService: RealEstateService);
    create(createRealEstateDto: CreateRealEstateDto): Promise<import("../entities/real-estate-post.entity").RealEstatePost>;
    findAll(): Promise<import("../entities/real-estate-post.entity").RealEstatePost[]>;
    findOne(id: string): Promise<import("../entities/real-estate-post.entity").RealEstatePost>;
    remove(id: string): Promise<void>;
}
