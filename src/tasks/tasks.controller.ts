import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskRes } from './dto/create-task-res.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public get(@Query() filterDto: GetTaskFilterDto): Task[] {
    console.log(filterDto + ', ' + Object.keys(filterDto).length);
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  public getTaskByID(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  // @Post()
  // public createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Task {
  //   console.log('title: ' + title + ', descritpion: ' + description);

  //   return this.tasksService.createTask(title, description);
  // }
  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDTO): CreateTaskRes {
    // console.log(createTaskDto);

    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  public deleteTask(@Param('id') id: string): boolean {
    return this.tasksService.deleteTask(id);
  }

  // @Patch("/:id/description")
  // @Patch("/:id/name")
  // ...
  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    console.log({ id: id, status: status });

    return this.tasksService.updateTaskStatus(id, status);
  }
}
