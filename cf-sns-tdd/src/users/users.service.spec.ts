import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersModel } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesEnum } from './const/roles.const';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;
  let mockData: UsersModel;
  let createUserDtoArgs: CreateUserDto;

  beforeEach(async () => {
    const UsersRepositoryMock = {
      getUsersRepository: jest.fn(),
      createUserRepository: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useFactory: () => UsersRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined repository', () => {
    expect(repository).toBeDefined();
  });

  // service 1 getAllUsers 메소드
  describe('getAllUsers', () => {
    // service 1-1 getAllUsers 메소드가 정의 되었는지
    it('should be defined getAllUsers()', () => {
      expect(service.getAllUsers).toBeDefined();
    });

    // service 1-2 service의 getAllUsers 메서드를 호출 했을때 repository의 리턴 에러가 안나는지 체크
    it('repository에서 에러를 리턴 안하는지 ', async () => {
      await expect(service.getAllUsers()).resolves.not.toThrow();
    });

    // service 1-3 repository의 리턴이 있을때 service의 getAllUsers 메서드에 제대로 리턴값이 오는지 체크
    it('repository의 리턴이 있을때 service의 getAllUsers 메서드에 제대로 리턴값이 오는지 체크', async () => {
      (repository.getUsersRepository as jest.Mock).mockReturnValue([]);
      expect(await service.getAllUsers()).toEqual([]);
    });
  });

  // service 2 createUser 메서드
  describe('createUser', () => {
    // service 2-1 createUser 메소드가 정의 되었는지
    it('should be defined createUser()', () => {
      expect(service.createUser).toBeDefined();
    });

    // service 2-2 파라미터값이 올바른지 확인
    it('service 2-2 파라미터값이 올바른지 확인', async () => {
      repository.createUserRepository = jest.fn().mockReturnValue(mockData);
      await service.createUser(createUserDtoArgs);
      expect(repository.createUserRepository).toHaveBeenCalledWith(
        createUserDtoArgs,
      );
    });
  });
});
