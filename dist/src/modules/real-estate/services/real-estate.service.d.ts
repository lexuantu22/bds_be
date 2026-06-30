import { Repository } from 'typeorm';
import { RealEstatePost } from '../entities/real-estate-post.entity';
import { CreateRealEstateDto } from '../dto/create-real-estate.dto';
export declare class RealEstateService {
    private realEstateRepository;
    constructor(realEstateRepository: Repository<RealEstatePost>);
    create(createRealEstateDto: CreateRealEstateDto): Promise<RealEstatePost>;
    findAll(page?: number, limit?: number): Promise<{
        data: RealEstatePost[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<RealEstatePost>;
    remove(id: string): Promise<void>;
}
