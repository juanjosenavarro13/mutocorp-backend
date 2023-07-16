import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users';
import { CreateRaiderDto, RaidersService } from 'src/raiders';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly raidersService: RaidersService,
  ) {}

  async getAllUsers() {
    return this.usersService.findAll();
  }

  async getAllRaiders() {
    return this.raidersService.getRaiders();
  }

  async createRaider(raider: CreateRaiderDto) {
    return this.raidersService.createRaider(raider);
  }
}
