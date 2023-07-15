import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Raider } from '../schemas/raiders.schema';
import { Model } from 'mongoose';

@Injectable()
export class RaidersService {
  constructor(
    @InjectModel(Raider.name) private readonly raiderModel: Model<Raider>,
  ) {}

  async getRaiders() {
    return await this.raiderModel.find().exec();
  }
}
