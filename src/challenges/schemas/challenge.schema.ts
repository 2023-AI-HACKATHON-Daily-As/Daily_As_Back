import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({versionKey: false})
export class Challenges extends Document {
  @Prop({ required: true })
  host: string;

  @Prop({ type:[]})
  members: string[];

  @Prop({ type: Number })
  memberNum: number;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ type: String })
  thumbnail: string;

  @Prop({ required: true})
  content: string;

  @Prop({ type: Boolean, default: false })
  isClosed: boolean;

  @Prop({ type: Boolean, default: true })
  isPrivate: boolean;

  @Prop({ required: true})
  startDate: Date;

  @Prop({ required: true})
  endDate: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const ChallengessSchema = SchemaFactory.createForClass(Challenges);