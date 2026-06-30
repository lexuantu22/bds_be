import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateRealEstateDto {
  @ApiProperty({ example: 'Beautiful Villa in District 1' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Spacious 3 bedroom villa...' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 15000000000 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 120.5 })
  @IsNotEmpty()
  @IsNumber()
  area: number;

  @ApiProperty({ example: 'District 1, HCMC' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ required: false, example: 'available' })
  @IsOptional()
  @IsString()
  status?: string;
}
