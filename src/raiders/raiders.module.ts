import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RaidersController } from './controllers/raiders.controller';
import { Raider, RaiderSchema } from './schemas/raiders.schema';
import { RaidersService } from './services/raiders.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Raider.name, schema: RaiderSchema }]),
  ],
  controllers: [RaidersController],
  providers: [RaidersService],
  exports: [RaidersService],
})
export class RaidersModule {}
