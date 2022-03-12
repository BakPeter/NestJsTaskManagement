import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger: Logger = new Logger('TaskController', { timestamp: true });
  constructor(private tasksService: TasksService) {}

  @Get()
  public get(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    // console.log(filterDto + ', ' + Object.keys(filterDto).length);
    this.logger.debug({ filterDto, user });
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  public getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  public createTask(
    @Body() createTaskDto: CreateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    // console.log(createTaskDto);
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  public deleteTask(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.tasksService.deleteTask(id, user);
  }

  // // @Patch("/:id/description")
  // // @Patch("/:id/name")
  // // ...
  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    // console.log({ id: id, updateTaskStatusDto: updateTaskStatusDto });
    return this.tasksService.updateTaskStatus(
      id,
      updateTaskStatusDto.status,
      user,
    );
  }
}
