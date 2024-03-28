import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersModel } from './entities/users.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesEnum } from './const/roles.const';
import { InternalServerErrorException } from '@nestjs/common';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let usersRepository: Repository<UsersModel>;
  let mockData: UsersModel;
  let createUserDtoArgs: CreateUserDto;

  beforeEach(async () => {
    const UsersRepositoryMock = {
      find: jest.fn(),
      save: jest.fn(),
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

    mockData = {
      id: 1,
      nickname: 'factory',
      email: 'rhkdtjd_12@naver.com',
      password: 'factory',
      role: RolesEnum.USER,
    };

    createUserDtoArgs = {
      nickname: mockData.nickname,
      email: mockData.email,
      password: mockData.password,
    };
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

  // 2. createUserRepository()
  describe('createUserRepository()', () => {
    // 2-1 createUserRepository 메서드가 정의 되었는지
    it('createUserRepository 메서드가 정의 되었는지', () => {
      expect(repository.createUserRepository).toBeDefined();
    });

    // 2-2 파라미터값이 올바른지 확인
    it('파라미터값이 올바른지 확인', async () => {
      usersRepository.save = jest.fn().mockReturnValue(mockData);
      await repository.createUserRepository(createUserDtoArgs);
      expect(usersRepository.save).toHaveBeenCalledWith(createUserDtoArgs);
    });

    // 2-3 repository save 함수가 에러가 났을때
    it('repository save 함수가 에러가 났을때', async () => {
      usersRepository.save = jest
        .fn()
        .mockRejectedValue(new InternalServerErrorException());

      await expect(
        repository.createUserRepository(createUserDtoArgs),
      ).rejects.toThrow(new InternalServerErrorException());
    });

    // 2-4 save함수 성공시 리턴값
    it('save함수 성공시 리턴값', async () => {
      usersRepository.save = jest.fn().mockResolvedValue(mockData);

      expect(await repository.createUserRepository(createUserDtoArgs)).toEqual(
        mockData,
      );
    });
  });
});
