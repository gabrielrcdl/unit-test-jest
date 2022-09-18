/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from './../common/test/TestUtil';

import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Todos os testes referentes ao findAll é um rótulo
  describe('findAllUsers', () => {
    // "Isso" aqui é o teste
    it('should be list all users', async () => {
      const user = TestUtil.giveAMeValidUser();
      mockRepository.find.mockReturnValue([user, user]);
      const users = await service.findAll();
      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(8);
    });
  });
});
