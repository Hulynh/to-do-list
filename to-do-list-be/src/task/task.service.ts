import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDto } from './dtos/create.dto';
import { UpdateDto } from './dtos/update.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task')
    private taskModel: Model<'Task'>,
  ) {}
  async getTasks() {
    const task = await this.taskModel.find();
    return task;
  }
  async createTask(request: CreateDto) {
    const createdTask = new this.taskModel(request);
    return createdTask.save();
  }
  async updateTask(query: UpdateDto) {
    const { id, content } = query;
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, {
      upsert: true,
      content,
      returnDocument: 'after',
    });
    return updatedTask;
  }
  async deleteTask(id: string) {
    const deletedTask = await this.taskModel.findByIdAndDelete(id);
    return deletedTask;
  }
}
