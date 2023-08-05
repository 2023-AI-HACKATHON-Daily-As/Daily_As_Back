import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';
import { Memos } from './schemas/memo.schema';
import { Tasks } from './schemas/task.schema';

@Injectable()
export class MemosService {
    constructor(
        @InjectModel(Memos.name) private memosModel: Model<Memos>,
        @InjectModel(Tasks.name) private tasksModel: Model<Tasks>,
    ) { }

    async createMemo(taskId: string, createMemoDto: CreateMemoDto) {
        const task = await this.tasksModel.findById(taskId);

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        const memo = new this.memosModel(createMemoDto);
        await memo.save();

        task.subMemo.push(memo);
        await task.save();

        return memo;
    }

    async findAllMemo() {
        return this.memosModel.find().exec();
      }
    
      async findOneMemo(id: string) {
        return this.memosModel.findById(id).exec();
      }

    async updateMemo(id: string, updateMemoDto: UpdateMemoDto) {
        return this.memosModel.findByIdAndUpdate(
            { id },
            {
                $set: {
                    title: updateMemoDto.title,
                    description: updateMemoDto.description,
                    thumbnail: updateMemoDto.thumbnail,
                    isCompleted: updateMemoDto.isCompleted,
                    startDate: updateMemoDto.startDate,
                    endDate: updateMemoDto.endDate
                }
            }
        ).exec();
    }

    async removeMemo(id: string) {
        return this.memosModel.findByIdAndRemove(id).exec();
    }
}
