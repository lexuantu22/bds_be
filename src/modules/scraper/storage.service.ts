import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RealEstatePost } from './entities/real-estate-post.entity';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  constructor(
    @InjectRepository(RealEstatePost)
    private postRepository: Repository<RealEstatePost>,
  ) {}

  async saveItems(items: any[]) {
    if (!items || items.length === 0) return;

    try {
      const saved = await this.postRepository.save(items);
      this.logger.log(
        `Successfully saved ${saved.length} items to Postgres DB`,
      );
    } catch (error) {
      this.logger.error('Error saving to DB:', error.message);
    }
  }
}
