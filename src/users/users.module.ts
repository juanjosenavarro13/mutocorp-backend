import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared/shared.module';
import { UsersController } from './controllers';
import { User, UserSchema } from './schemas';
import { UsersService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SharedModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
