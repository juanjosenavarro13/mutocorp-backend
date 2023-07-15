import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RaiderDocument = HydratedDocument<Raider>;

@Schema({ timestamps: true })
export class Raider {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

  @Prop({ required: true, default: 0 })
  hikoins: number;
}

export const RaiderSchema = SchemaFactory.createForClass(Raider);
