import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersModel } from './entities/users.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from './users.repository';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let usersRepository: Repository<UsersModel>;

  beforeEach(async () => {
    const UsersRepositoryMock = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getRepositoryToken(UsersModel),
          useFactory: () => UsersRepositoryMock,
        },
      ],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepository);
    usersRepository = module.get<Repository<UsersModel>>(
      getRepositoryToken(UsersModel),
    );
  });

  it('should be defined repository', () => {
    expect(repository).toBeDefined();
  });

  it('should be defined usersRepository', () => {
    expect(usersRepository).toBeDefined();
  });

  // 1. getUsersRepsotiry()
  describe('getUsersRepsotiry()', () => {
    // 1-1 getUsersRepsotiry가 정의 되어 있는지
    it('getUsersRepsotiry가 정의 되어 있는지', () => {
      expect(repository.getUsersRepository).toBeDefined();
    });

    // 1-2 find 메서드의 리턴값이 정상적으로 리턴 되는지
    it('find 메서드의 리턴값이 정상적으로 리턴 되는지', async () => {
      usersRepository.find = jest.fn().mockReturnValue([]);

      expect(await repository.getUsersRepository()).toEqual([]);
    });
  });
});
