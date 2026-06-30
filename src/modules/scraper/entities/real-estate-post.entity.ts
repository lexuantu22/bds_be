import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('real_estate_posts')
export class RealEstatePost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  price: string;

  @Column({ type: 'text', nullable: true })
  area: string;

  @Column({ type: 'text', nullable: true })
  location: string;

  @Column({ type: 'text', nullable: true })
  link: string;

  @Column({ type: 'text', nullable: true })
  content: string; // Dùng cho Facebook hoặc Description web

  @Column({ type: 'jsonb', nullable: true })
  rawData: any; // Lưu toàn bộ data thô dạng JSON để xử lý sau này

  @Column({ type: 'varchar', length: 50 })
  source: string; // 'batdongsan.com.vn' hoặc 'facebook'

  @CreateDateColumn()
  scrapedAt: Date;
}
