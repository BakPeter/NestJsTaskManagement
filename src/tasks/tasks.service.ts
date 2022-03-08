import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateTaskRes } from './dto/create-task-res.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    console.log(filterDto);

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((t) => t.status === status);
    }

    if (search) {
      tasks = tasks.filter((t) => {
        return t.title.includes(search) || t.description.includes(search);
      });
    }

    return tasks;
  }

  public createTask(createTaskDto: CreateTaskDTO): CreateTaskRes {
    var { title, description } = createTaskDto;

    createTaskDto.description;
    var task = {
      id: uuidV4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return { createdTask: task, messages: null };
  }

  public getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  public deleteTask(id: string): boolean {
    const found = this.getTaskById(id);

    if (found) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
      return true;
    }

    return false;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    // var task = this.tasks.find((t) => t.id === id);
    var task = this.getTaskById(id);
    if (task) {
      task.status = status;
    }

    return task;
  }
}
