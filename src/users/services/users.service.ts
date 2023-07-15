import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { jwtConstants } from 'src/auth/constants';
import { User } from '../schemas';
import { DataUpdate, UserRegister, UserSave, userResponse } from '../types';
import { UpdateProfileDTO } from '../dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll() {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, dataUpdate: DataUpdate) {
    return await this.userModel.findByIdAndUpdate(id, dataUpdate).exec();
  }

  async create(user: UserRegister) {
    return await this.userModel.create(user);
  }

  comparePassword(password: string, password_confirmation: string) {
    return password === password_confirmation;
  }

  async profile(token: string) {
    if (!token) {
      throw new HttpException(
        'Access Denied no token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    const findUser = await this.findByEmail(user.email);

    if (!findUser) {
      throw new HttpException(
        'Access Denied no find user',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.userResponse(findUser);
  }

  async updateProfile(dateUpdate: UpdateProfileDTO, token: string) {
    if (!token) {
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    const userSave = await this.findByEmail(user.email);

    if (!userSave) {
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);
    }

    return await this.userModel
      .updateOne({ email: user.email }, dateUpdate)
      .exec();
  }

  private userResponse(user: UserSave): userResponse {
    const { name, email, createdAt, updatedAt, refreshToken, role, _id } = user;

    return {
      id: _id,
      name,
      email,
      createdAt,
      updatedAt,
      refreshToken,
      role,
    };
  }
}
