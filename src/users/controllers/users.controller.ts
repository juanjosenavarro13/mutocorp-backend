import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/shared/decorators';
import { RtGuard } from 'src/shared/guards';
import { UsersService } from './../services/users.service';
import { UpdateProfileDTO } from '../dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(RtGuard)
  @ApiResponse({ status: 200, description: 'refresh token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('profile')
  getProfile(@GetCurrentUser('refreshToken') refreshToken: string) {
    return this.usersService.profile(refreshToken);
  }

  @UseGuards(RtGuard)
  @ApiResponse({ status: 200, description: 'refresh token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('profile')
  updateProfile(@Body() dateUpdate: UpdateProfileDTO, @Headers() headers) {
    // obtener headers
    const token = headers.authorization.split(' ')[1];

    return this.usersService.updateProfile(dateUpdate, token);
  }
}
