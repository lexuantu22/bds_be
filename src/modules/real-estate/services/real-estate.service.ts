import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RealEstatePost } from '../entities/real-estate-post.entity';
import { CreateRealEstateDto } from '../dto/create-real-estate.dto';

@Injectable()
export class RealEstateService {
  constructor(
    @InjectRepository(RealEstatePost)
    private realEstateRepository: Repository<RealEstatePost>,
  ) {}

  async create(
    createRealEstateDto: CreateRealEstateDto,
  ): Promise<RealEstatePost> {
    const newPost = this.realEstateRepository.create(createRealEstateDto);
    return this.realEstateRepository.save(newPost);
  }

  async findAll(): Promise<RealEstatePost[]> {
    return this.realEstateRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<RealEstatePost> {
    const post = await this.realEstateRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Real estate post with ID ${id} not found`);
    }
    return post;
  }

  async remove(id: string): Promise<void> {
    const result = await this.realEstateRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Real estate post with ID ${id} not found`);
    }
  }
}
