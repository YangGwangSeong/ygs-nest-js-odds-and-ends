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
});
