import { Injectable } from '@nestjs/common';
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
    return this.tasks.find((task) => task.id === id);
  }

  public deleteTask(id: string): boolean {
    var ind = this.tasks.findIndex((t) => t.id === id);
    var retVal = ind !== -1;
    // console.log('task found = ' + retVal);

    if (retVal) {
      this.tasks.splice(ind, 1);
    }

    return retVal;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    var task = this.tasks.find((t) => t.id === id);

    if (task) {
      task.status = status;
    }

    return task;
  }
}
