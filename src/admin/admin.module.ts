import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { UsersModule } from 'src/users';
import { RaidersModule } from 'src/raiders';

@Module({
  imports: [UsersModule, RaidersModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
