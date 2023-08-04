import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name) private tasksModel: Model<Tasks>,
  ) { }

  async createTask(createTaskDto: CreateTaskDto) {
    const newTask = new this.tasksModel(createTaskDto);
    return newTask.save();
  }

  async findAllTask() {
    return this.tasksModel.find().exec();
  }

  async findOneTask(id: string) {
    return this.tasksModel.findById(id).exec();
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    return this.tasksModel.findByIdAndUpdate(
      { id },
      {
        $set: {
          date: updateTaskDto.date,
          subMemo: updateTaskDto.subMemo,
          isCompleted: updateTaskDto.isCompleted,
        }
      }
    ).exec();
  }

  async removeTask(id: string) {
    return this.tasksModel.findByIdAndRemove(id).exec();
  }

  async updateCompleted(id: string, isCompleted: boolean) {
    return this.tasksModel.findByIdAndUpdate(
      { id },
      {
        $set: {
          isCompleted
        }
      }
    ).exec();
  }
}