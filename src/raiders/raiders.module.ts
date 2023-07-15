import { Module } from '@nestjs/common';
import { RaidersController } from './controllers/raiders.controller';
import { RaidersService } from './services/raiders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Raider, RaiderSchema } from './schemas/raiders.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Raider.name, schema: RaiderSchema }]),
  ],
  controllers: [RaidersController],
  providers: [RaidersService],
})
export class RaidersModule {}
