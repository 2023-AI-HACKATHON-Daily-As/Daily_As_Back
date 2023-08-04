import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Memos } from './memo.schema';

@Schema({ versionKey: false })
export class Tasks {
  @Prop({ required: true })
  date: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Memos' }] })
  subMemo: Memos[];

  @Prop({ default: false })
  isCompleted: boolean;
}

export type TasksDocument = Tasks & Document;
export const TasksSchema = SchemaFactory.createForClass(Tasks);