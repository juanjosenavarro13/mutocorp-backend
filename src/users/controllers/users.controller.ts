import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/shared/decorators';
import { RtGuard } from 'src/shared/guards';
import { userResponse } from '../types';
import { UsersService } from './../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(RtGuard)
  @ApiResponse({ status: 200, description: 'refresh token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('profile')
  profile(
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<userResponse | null> {
    return this.usersService.profile(refreshToken);
  }
}
