import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from '../src/users/entities/users.entity';
import { UsersModule } from '../src/users/users.module';
import { UsersRepository } from '../src/users/users.repository';
import { UsersService } from '../src/users/users.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { PostsModel } from '../src/posts/entities/posts.entity';
import { ClearDatabase } from './utils/clear-database';

describe('UsersController E2E Test', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let usersRepository: Repository<UsersModel>;
  let mockData: UsersModel;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: [`${__dirname}/../.${process.env.NODE_ENV}.env`],
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            const option = {
              type: configService.get('DB_TYPE'),
              host: configService.get('DB_HOST'),
              port: Number(configService.get<number>('DB_PORT')),
              username: configService.get('DB_USERNAME'),
              database: configService.get('DB_DATABASE'),
              password: configService.get('DB_PASSWORD'),
              entities: [UsersModel, PostsModel],
              synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
            };

            return option;
          },
        }),
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = moduleFixture.get<UsersService>(UsersService);
    usersRepository = moduleFixture.get<UsersRepository>(UsersRepository);
  });

  beforeEach(async () => {
    mockData = await usersRepository.save({
      id: 1,
      nickname: 'factory2',
      email: 'soaw83@gmail.com',
      password: 'factory',
    });
  });

  afterEach(async () => {
    await ClearDatabase(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined usersService', () => {
    expect(usersService).toBeDefined();
  });

  // e2e 1. Get All Users Get /posts
  describe('Users', () => {
    // e2e 1-1 (GET) All Post Get /posts
    it('(GET) All Users Get /users', async () => {
      const res = await request(app.getHttpServer())
        .get('/users')
        .expect(HttpStatus.OK);
      expect(res.body[0]).toEqual(mockData);
    });
  });

  // e2e 2. Create User POST /users
  describe('(POST) /users', () => {
    // e2e 2-1 파라미터값이 정확한지 확인
    it('(POST) 파라미터값이 정확한지 확인', async () => {
      const createUser: CreateUserDto = {
        nickname: 'yangdev',
        email: 'soawn83@nate.com',
        password: 'factory',
      };

      const userServSpy = jest.spyOn(usersService, 'createUser');

      await request(app.getHttpServer())
        .post(`/users`)
        .send(createUser)
        .expect(HttpStatus.CREATED);

      expect(userServSpy).toHaveBeenCalledWith(createUser);
    });

    // e2e 2-2 (POST) 요청이 정상적일때 리턴값 확인
    it('(POST) 요청이 정상적일때 리턴값 확인', async () => {
      const createUser: CreateUserDto = {
        nickname: 'yangdev',
        email: 'soawn83@nate.com',
        password: 'factory',
      };

      const res = await request(app.getHttpServer())
        .post(`/users`)
        .send(createUser)
        .expect(HttpStatus.CREATED);

      expect(res.body.nickname).toEqual(createUser.nickname);
      expect(res.body.email).toEqual(createUser.email);
    });
  });
});
