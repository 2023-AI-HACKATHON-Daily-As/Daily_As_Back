import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tasks extends Document {
  // @Prop({ required: true, unique: true })
  // user_id: string;

  @Prop({ required: true, unique: false })
  task: string;

  @Prop({ required: true, unique: false })
  description: string;

  @Prop({ type: [String], required: false, unique: false })
  sub_task: string[];

  @Prop({ required: true, unique: false })
  date: Date;

  @Prop({ required: false, unique: false })
  deadline: Date;

  @Prop({ required: false, unique: false })
  completed: boolean;

  @Prop({ required: false, unique: false })
  disabled: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);
