import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('real_estate_posts')
export class RealEstatePost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  area: number;

  @Column({ nullable: true })
  location: string;

  @Column({ default: 'available', nullable: true }) // e.g., available, sold
  status: string;

  @Column({ type: 'text', nullable: true })
  link: string;

  @Column({ type: 'text', nullable: true })
  content: string; // Dùng cho Facebook hoặc Description web

  @Column({ type: 'jsonb', nullable: true })
  rawData: any; // Lưu toàn bộ data thô dạng JSON để xử lý sau này

  @Column({ type: 'varchar', length: 50, nullable: true })
  source: string; // 'batdongsan.com.vn' hoặc 'facebook'

  @CreateDateColumn({ nullable: true })
  scrapedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
