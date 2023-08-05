import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MemosService } from './memos.service';
import { TasksController } from './tasks.controller';
import { Tasks, TasksSchema } from './schemas/task.schema';
import { Memos, MemoSchema } from './schemas/memo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tasks.name, schema: TasksSchema },
      { name: Memos.name, schema: MemoSchema },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService, MemosService],
})

export class MemosModule {}