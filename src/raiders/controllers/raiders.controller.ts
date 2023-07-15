import { Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RaidersService } from '../services';
import { Public } from 'src/shared/decorators';

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
}
