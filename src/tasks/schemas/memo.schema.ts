import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false })
export class Memos {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  thumbnail: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Tasks' })
  tasks: Types.ObjectId[];
}

export type MemoDocument = Memos & Document;
export const MemoSchema = SchemaFactory.createForClass(Memos);