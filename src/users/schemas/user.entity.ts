import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  password: string;

  @Prop({ required: true, unique: true })
  nickname: string;

  @Prop({ required: true, unique: false })
  social_type: string;

  @Prop({ required: true, enum: ['ADMIN', 'USER'] })
  role: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
