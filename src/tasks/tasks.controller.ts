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
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public get(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    // console.log(filterDto + ', ' + Object.keys(filterDto).length);
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {
    // console.log(createTaskDto);

    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  public deleteTask(@Param('id') id: string): Promise<boolean> {
    return this.tasksService.deleteTask(id);
  }

  // // @Patch("/:id/description")
  // // @Patch("/:id/name")
  // // ...
  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    // console.log({ id: id, updateTaskStatusDto: updateTaskStatusDto });
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto.status);
  }
}
