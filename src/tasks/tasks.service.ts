import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks } from './schemas/task.schema';
import { Model, Types } from 'mongoose';

// TODO: sub_task[]에 존속할 수 있는 개별 subTask 만들기.

@Injectable()
export class TasksService {
  constructor(@InjectModel(Tasks.name) private tasksModel: Model<Tasks>) { }

  async create(createTaskDto: CreateTaskDto): Promise<Tasks> {
    const newTask = new this.tasksModel(createTaskDto);
    return newTask.save();
  }

  async findAll(): Promise<Tasks[]> {
    return this.tasksModel.find().exec();
  }

  async findOne(id: string): Promise<Tasks> {
    return this.tasksModel.findById(id).exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const _id = new Types.ObjectId(id);

    await this.tasksModel.updateOne(
      { _id },
      { updateTaskDto }
    )
  }

  async remove(id: string): Promise<Tasks> {
    return this.tasksModel.findByIdAndRemove(id).exec();
  }

  async updateCompleted(id: string, isCompleted: boolean): Promise<Tasks> {
    const _id = new Types.ObjectId(id);

    return this.tasksModel.findByIdAndUpdate(
      { _id },
      { completed: isCompleted },
      { new: true }
    ).exec();
  }

  async updateDisabled(id: string, isDisabled: boolean): Promise<Tasks> {
    const _id = new Types.ObjectId(id);

    return this.tasksModel.findByIdAndUpdate(
      { _id },
      { disabled: isDisabled },
      { new: true }
    ).exec();
  }
}
