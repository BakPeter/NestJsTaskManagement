import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  public getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  public createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  public async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  public async deleteTask(id: string): Promise<boolean> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return false;
  }

  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    // var task = this.tasks.find((t) => t.id === id);
    var task = await this.getTaskById(id);

    task.status = status;

    await this.tasksRepository.save(task);

    return task;
  }
}
