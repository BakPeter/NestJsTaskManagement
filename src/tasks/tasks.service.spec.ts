import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Ariel',
  id: 'somdId',
  password: 'somePassword',
  tasks: [],
};

describe('TaskService', () => {
  let tasksService: TasksService;
  //   let tasksRepository: TasksRepository;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks()', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      //   expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      //   tasksRepository.getTasks.mockResolvedValue('someValue');
      //   const result = await tasksService.getTasks(null, mockUser);
      //   expect(tasksRepository.getTasks).toHaveBeenCalled();
      //   expect(result).toEqual('someValue');
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and retunrs the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test description',
        id: 'someId',
        status: TaskStatus.OPEN,
      };

      tasksRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and hendled an error', () => {
      tasksRepository.findOne.mockResolvedValue(null);
      const mockId = 'someId';
      //   const mockException = new NotFoundException(
      //     `Task with ID "${mockId}" not found`,
      //   );
      //   expect(tasksService.getTaskById(mockId, mockUser)).rejects.toThrow(
      //     mockException,
      //   );
      //   expect(tasksService.getTaskById(mockId, mockUser)).rejects.toThrow(
      //     `Task with ID "${mockId}" not found`,
      //   );
      expect(tasksService.getTaskById(mockId, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
