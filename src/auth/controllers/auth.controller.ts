import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../shared/decorators';
import { GetCurrentUserId } from '../../shared/decorators/get-current-id.decorator';
import { GetCurrentUser } from '../../shared/decorators/get-current-user.decorator';
import { RtGuard } from '../../shared/guards';
import { LoginDTO, RegisterDTO } from '../dto';
import { AuthService } from '../services';
import { Tokens } from '../types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(user: RegisterDTO): Promise<Tokens> {
    return this.authService.register(user);
  }

  @Public()
  @Post('register')
  @ApiResponse({ status: 200, description: 'User register' })
  @ApiResponse({
    status: 400,
    description: 'user already exists, passwords do not match or invalid data',
  })
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: RegisterDTO): Promise<Tokens> {
    return this.authService.register(dto);
  }

  @Public()
  @ApiResponse({ status: 200, description: 'User logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() user: LoginDTO): Promise<Tokens> {
    return this.authService.login(user);
  }

  @Public()
  @ApiResponse({ status: 200, description: 'refresh token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(RtGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @ApiResponse({ status: 200, description: 'logout' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }
}
