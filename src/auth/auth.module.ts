import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [UsersModule, JwtModule.register({}), SharedModule],
  controllers: [AuthController],
  providers: [AuthService, RtStrategy, AtStrategy],
})
export class AuthModule {}
