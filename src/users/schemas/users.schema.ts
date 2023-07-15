import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from '../types';
import { Raider } from 'src/raiders';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ default: null })
  refreshToken: string;

  @Prop({ default: Role.USER })
  role: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'raiders',
  })
  user: Raider;
}

export const UserSchema = SchemaFactory.createForClass(User);
