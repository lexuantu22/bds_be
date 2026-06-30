import { Repository } from 'typeorm';
import { RealEstatePost } from '../entities/real-estate-post.entity';
import { CreateRealEstateDto } from '../dto/create-real-estate.dto';
export declare class RealEstateService {
    private realEstateRepository;
    constructor(realEstateRepository: Repository<RealEstatePost>);
    create(createRealEstateDto: CreateRealEstateDto): Promise<RealEstatePost>;
    findAll(): Promise<RealEstatePost[]>;
    findOne(id: string): Promise<RealEstatePost>;
    remove(id: string): Promise<void>;
}
