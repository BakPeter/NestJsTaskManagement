import { Task } from '../task.model';

export class CreateTaskRes {
  createdTask: Task;
  messages: string[];
}

export class CreateTaskDTO {
  title: string;
  description: string;
}
