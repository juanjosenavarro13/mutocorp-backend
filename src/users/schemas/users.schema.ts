import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../types';

export type UserDocument = HydratedDocument<User>;

@Schema()
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

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
