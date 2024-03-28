import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from '../src/users/entities/users.entity';
import { UsersModule } from '../src/users/users.module';
import { UsersRepository } from '../src/users/users.repository';
import { UsersService } from '../src/users/users.service';
import { Repository } from 'typeorm';

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
              entities: [UsersModel],
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
    await usersRepository.clear();

    mockData = await usersRepository
      .save({
        id: 1,
        nickname: 'factory',
        email: 'rhkdtjd_12@naver.com',
        password: 'factory',
        created_at: new Date(),
        updated_at: new Date(),
      })
      .then((data) => {
        return {
          ...data,
          created_at: data.created_at.toISOString() as unknown as Date,
          updated_at: data.updated_at.toISOString() as unknown as Date,
        };
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined postsService', () => {
    expect(usersService).toBeDefined();
  });
});
