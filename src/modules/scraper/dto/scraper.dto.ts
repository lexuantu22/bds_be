import { IsString, IsNotEmpty, IsIn, IsBoolean, IsOptional } from 'class-validator';

export class AddScrapeTargetDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsIn(['google', 'facebook'])
  platform: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateScrapeTargetDto {
  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsIn(['google', 'facebook'])
  @IsOptional()
  platform?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class ToggleScraperJobDto {
  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;
}
