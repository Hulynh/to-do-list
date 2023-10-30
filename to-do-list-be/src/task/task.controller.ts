import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CreateDto } from './dtos/create.dto';
import { TaskService } from './task.service';
import { UpdateDto } from './dtos/update.dto';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all')
  async getTask(@Res() res) {
    const result = await this.taskService.getTasks();
    return res.status(HttpStatus.OK).json(result);
  }
  @Post('create')
  async postTask(@Res() res, @Body() request: CreateDto) {
    const result = await this.taskService.createTask(request);
    return res.status(HttpStatus.OK).json(result);
  }
  @Post('update')
  async updateTask(@Res() res, @Body() request: UpdateDto) {
    const result = await this.taskService.updateTask(request);
    return res.status(HttpStatus.OK).json(result);
  }
  @Delete('delete')
  async deleteTask(@Res() res, @Query('id') id: string) {
    const result = await this.taskService.deleteTask(id);
    return res.status(HttpStatus.OK).json(result);
  }
}
