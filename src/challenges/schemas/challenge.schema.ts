import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Challenges extends Document {
  @Prop({ required: true, unique: true })
  challenge: string;

  @Prop({ required: true, unique: false })
  content: string;

  @Prop({ required: true, unique: false })
  start_date: Date;

  @Prop({ required: true, unique: false })
  end_date: Date;
}

export const ChallengessSchema = SchemaFactory.createForClass(Challenges);
