import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../typeorm';
import { Repository } from 'typeorm';
import * as bcyptUils from '../../utils/bcypt';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  // userService Unit test
  describe('createUser', () => {
    jest.spyOn(bcyptUils, 'encodePassword').mockReturnValue('hashed123');

    // userService Unit test - 1. should encode password correctly
    // 내 생각에 여기에서 실제 결과값을 얻을 수 있는 spyOn을 이용해서 해시값이 잘 생성되는지 테스트 한것 같다.
    // 어떤 부분을 mocking 할것이고 어떤것을 spyOn 할것인지가 중요한것 같다.
    it('should encode password correctly', async () => {
      await service.createUser({
        username: 'anson',
        email: 'anson@gmail.com',
        password: '123',
      });

      expect(bcyptUils.encodePassword).toHaveBeenCalledWith('123');
    });

    // userService Unit test - 2. should call userRepository.create with correct params
    it('should call userRepository.create with correct params', async () => {
      await service.createUser({
        username: 'anson',
        email: 'anson@gmail.com',
        password: '123',
      });

      expect(userRepository.create).toHaveBeenCalledWith({
        username: 'anson',
        email: 'anson@gmail.com',
        password: 'hashed123',
      });
    });
  });
});
