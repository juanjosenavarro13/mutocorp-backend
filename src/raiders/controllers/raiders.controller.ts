import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RaidersService } from '../services';
import { Public } from 'src/shared/decorators';
import { RolesGuard } from 'src/shared/guards';
import { CreateRaiderDto } from '../dtos';

@ApiTags('raiders')
@Controller('raiders')
export class RaidersController {
  constructor(private readonly raidersService: RaidersService) {}

  @Public()
  @Get('')
  @ApiResponse({ status: 200, description: 'get all raiders' })
  @HttpCode(HttpStatus.ACCEPTED)
  getRaiders() {
    return this.raidersService.getRaiders();
  }

  @Post('')
  @ApiResponse({ status: 200, description: 'raider created' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 400, description: 'user not found or raider exist' })
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(RolesGuard)
  createRaider(@Body() body: CreateRaiderDto) {
    return this.raidersService.createRaider(body);
  }
}
