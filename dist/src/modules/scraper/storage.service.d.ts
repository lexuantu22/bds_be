import { Repository } from 'typeorm';
import { RealEstatePost } from './entities/real-estate-post.entity';
export declare class StorageService {
    private postRepository;
    private readonly logger;
    constructor(postRepository: Repository<RealEstatePost>);
    saveItems(items: any[]): Promise<void>;
}
