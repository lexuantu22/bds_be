import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RealEstatePost } from '../modules/scraper/entities/real-estate-post.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', '123'),
        database: configService.get<string>('DB_NAME', 'real_estate'),
        entities: [RealEstatePost],
        synchronize: true, // Tự động đồng bộ cấu trúc bảng (dùng trong Dev)
      }),
    }),
  ],
})
export class DatabaseModule {}
