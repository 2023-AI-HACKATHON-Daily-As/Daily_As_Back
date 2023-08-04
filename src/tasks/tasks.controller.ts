import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Get()
  async findAllTask() {
    return this.tasksService.findAllTask();
  }

  @Get(':id')
  async findOneTask(@Param('id') id: string) {
    return this.tasksService.findOneTask(id);
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  async removeTask(@Param('id') id: string) {
    return this.tasksService.removeTask(id);
  }

  @Patch('/complete/:id')
  async updateCompleted(@Param('id') id: string, @Body('isCompleted') isCompleted: boolean) {
    await this.tasksService.updateCompleted(id, isCompleted);
  }
}