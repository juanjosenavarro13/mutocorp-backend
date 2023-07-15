import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRaiderDto } from '../dtos';
import { Raider } from '../schemas/raiders.schema';

@Injectable()
export class RaidersService {
  constructor(
    @InjectModel(Raider.name) private readonly raiderModel: Model<Raider>,
  ) {}

  async getRaiders() {
    const raiders = await this.raiderModel.find().exec();

    return raiders.sort((a, b) => {
      if (a.hikoins < b.hikoins) return 1;
      if (a.hikoins > b.hikoins) return -1;

      return 0;
    });
  }

  async getRaiderByIdUser(idUser: string) {
    return await this.raiderModel.findOne({ user: idUser }).exec();
  }

  async createRaider(raider: CreateRaiderDto) {
    try {
      if (
        (await this.raiderModel.findOne({ name: raider.name }).exec()) ||
        (await this.getRaiderByIdUser(raider.user))
      ) {
        throw new HttpException(
          'Raider already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error: any) {
      if (error.name === 'CastError')
        throw new HttpException(
          'CastError user not found',
          HttpStatus.BAD_REQUEST,
        );
      if (error.response === 'Raider already exists') {
        throw new HttpException(
          'Raider already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return await this.raiderModel.create(raider).then((raider) => {
      return raider;
    });
  }
}
