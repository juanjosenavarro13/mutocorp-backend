import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users';

export type RaiderDocument = HydratedDocument<Raider>;

@Schema({ timestamps: true })
export class Raider {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

  @Prop({ required: false, default: 0 })
  hikoins: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true,
  })
  user: User;
}

export const RaiderSchema = SchemaFactory.createForClass(Raider);
