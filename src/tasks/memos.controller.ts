import { Controller, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { MemosService } from './memos.service';
import { Memos } from './schemas/memo.schema';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';

@Controller('memos')
export class MemosController {
  constructor(private memosService: MemosService) {}

  @Post(':taskId')
  async create(@Param('taskId') taskId: string, @Body() createMemoDto: CreateMemoDto): Promise<Memos> {
    const memo = await this.memosService.createMemo(taskId, createMemoDto);
    if (!memo) {
      throw new NotFoundException('Memo not created');
    }
    return memo;
  }

  @Put(':id')
  async updateMemo(@Param('id') id: string, @Body() updateMemoDto: UpdateMemoDto): Promise<Memos> {
    const memo = await this.memosService.updateMemo(id, updateMemoDto);
    if (!memo) {
      throw new NotFoundException('Memo not found');
    }
    return memo;
  }

  @Delete(':id')
  async removeMemo(@Param('id') id: string): Promise<Memos> {
    const memo = await this.memosService.removeMemo(id);
    if (!memo) {
      throw new NotFoundException('Memo not found');
    }
    return memo;
  }
}
