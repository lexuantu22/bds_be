import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealEstateService } from './services/real-estate.service';
import { RealEstateController } from './controllers/real-estate.controller';
import { RealEstatePost } from './entities/real-estate-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RealEstatePost])],
  controllers: [RealEstateController],
  providers: [RealEstateService],
})
export class RealEstateModule {}
