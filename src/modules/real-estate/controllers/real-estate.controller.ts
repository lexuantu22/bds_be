import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RealEstateService } from '../services/real-estate.service';
import { CreateRealEstateDto } from '../dto/create-real-estate.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAccessGuard } from '../../auth/guards/jwt-access.guard';
import { Public } from '../../auth/decorators/public.decorator';

@ApiTags('real-estate')
@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Post()
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new real estate post (Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  create(@Body() createRealEstateDto: CreateRealEstateDto) {
    return this.realEstateService.create(createRealEstateDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all real estate posts' })
  findAll() {
    return this.realEstateService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a real estate post by id' })
  findOne(@Param('id') id: string) {
    return this.realEstateService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a real estate post by id (Admin only)' })
  remove(@Param('id') id: string) {
    return this.realEstateService.remove(id);
  }
}
