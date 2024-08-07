import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PostsModule } from '../src/posts/posts.module';
import { PostsService } from '../src/posts/posts.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from '../src/posts/entities/posts.entity';
import { PostsRepository } from '../src/posts/posts.repository';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../src/posts/dto/create-post.dto';
import { UpdatePostDto } from '../src/posts/dto/update-post.dto';
import { UsersModel } from '../src/users/entities/users.entity';
import { UsersModule } from '../src/users/users.module';
import { UsersRepository } from '../src/users/users.repository';
import { ClearDatabase } from './utils/clear-database';

describe('PostsController E2E Test', () => {
  let app: INestApplication;
  let postsService: PostsService;
  let postsRepository: Repository<PostsModel>;
  let usersRepository: Repository<UsersModel>;
  let mockData: PostsModel;
  let userMockData: UsersModel;

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
              entities: [PostsModel, UsersModel],
              synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
            };

            return option;
          },
        }),
        PostsModule,
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    postsService = moduleFixture.get<PostsService>(PostsService);
    postsRepository = moduleFixture.get<PostsRepository>(PostsRepository);
    usersRepository = moduleFixture.get<UsersRepository>(UsersRepository);
  });

  beforeEach(async () => {
    userMockData = await usersRepository.save({
      nickname: 'sgov',
      email: 'rhkdtjd_12@naver.com',
      password: 'factory',
      created_at: new Date(),
      updated_at: new Date(),
    });

    mockData = await postsRepository
      .save({
        title: '뉴진스 민지',
        authorId: userMockData.id,
        content: '멤버들 때문에 버거운 민지',
        likeCount: 10000000,
        commentCount: 999999,
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

  afterEach(async () => {
    await ClearDatabase(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined postsService', () => {
    expect(postsService).toBeDefined();
  });

  // e2e 1. Get All Posts Get /posts
  describe('Posts', () => {
    // e2e 1-1 (GET) All Post Get /posts
    it('(GET) All Post Get /posts', async () => {
      const res = await request(app.getHttpServer())
        .get('/posts')
        .expect(HttpStatus.OK);

      expect(res.body[0].title).toEqual(mockData.title);
    });
  });

  // e2e 2 (GET) get Post /posts/:postId
  describe('(GET) /posts/:postId', () => {
    // e2e 2-1 check correct parameter
    it('(GET) check correct parameter', async () => {
      const postServSpy = jest.spyOn(postsService, 'getPostById');
      await request(app.getHttpServer())
        .get(`/posts/${mockData.id}`)
        .expect(HttpStatus.OK);

      expect(postServSpy).toHaveBeenCalledWith(mockData.id);
    });

    // e2e 2-2 (GET) get Post /posts/:postId
    it('(GET) get Post /posts/:postId', async () => {
      const res = await request(app.getHttpServer())
        .get(`/posts/${mockData.id}`)
        .expect(HttpStatus.OK);

      expect(res.body.title).toEqual(mockData.title);
    });

    // e2e 2-3 (GET) get Post Not Found exception 404
    it('(GET) get Post Not Found exception 404', async () => {
      const postId = '999';
      const res = await request(app.getHttpServer())
        .get(`/posts/${postId}`)
        .expect(HttpStatus.NOT_FOUND);

      const result = {
        error: 'Not Found',
        message: 'post를 찾을 수 없습니다',
        statusCode: 404,
      };
      expect(res.body).toEqual(result);
    });
  });

  // e2e 3. Create Post POST /posts
  describe('(POST) /posts', () => {
    // e2e 3-1 check correct parameter
    it('(POST) check correct parameter', async () => {
      const createPost: CreatePostDto = {
        authorId: userMockData.id,
        title: 'bug',
        content: 'bug',
      };

      const postServSpy = jest.spyOn(postsService, 'createPost');

      await request(app.getHttpServer())
        .post(`/posts`)
        .send(createPost)
        .expect(HttpStatus.CREATED);

      expect(postServSpy).toHaveBeenCalledWith(createPost);
    });

    // e2e 3-2 (POST) Create Post /posts
    it('(POST) Create Post /posts', async () => {
      const createPost: CreatePostDto = {
        authorId: userMockData.id,
        title: '양광성',
        content: '양광성',
      };

      const res = await request(app.getHttpServer())
        .post('/posts')
        .send(createPost)
        .expect(HttpStatus.CREATED);

      expect(res.body.title).toEqual(createPost.title);
      expect(res.body.content).toEqual(createPost.content);
    });
  });

  // e2e 4. Update Post PATCH /posts/:postId
  describe('(PATCH) Update Post /posts/:postId', () => {
    // 4-1 (PATCH) check correct parameter
    it('(PATCH) check correct parameter', async () => {
      const updatePost: UpdatePostDto = {
        title: '업데이트된 뉴진스 혜인',
      };

      const postServSpy = jest.spyOn(postsService, 'updatePost');

      await request(app.getHttpServer())
        .patch(`/posts/${mockData.id}`)
        .send(updatePost)
        .expect(HttpStatus.OK);

      expect(postServSpy).toHaveBeenCalledWith(mockData.id, updatePost);
    });
    // 4-2 (PATCH) Update Post /posts/:postId
    it('(PATCH) Update Post /posts/:postId', async () => {
      const updatePost: UpdatePostDto = {
        title: '업데이트된 뉴진스 혜인',
      };

      const res = await request(app.getHttpServer())
        .patch(`/posts/${mockData.id}`)
        .send(updatePost)
        .expect(HttpStatus.OK);
      expect(res.body.title).toEqual(updatePost.title);
    });
    // 4-3 (PATCH) Post Not Found exception 404 /posts/:postId
    it('(PATCH) Post Not Found exception 404', async () => {
      const postId = '999';
      const res = await request(app.getHttpServer())
        .patch(`/posts/${postId}`)
        .expect(HttpStatus.NOT_FOUND);
      const result = {
        error: 'Not Found',
        message: 'post를 찾을 수 없습니다',
        statusCode: 404,
      };
      expect(res.body).toEqual(result);
    });
  });

  // e2e 5. DELETE Post DELETE /posts/:postId
  describe('(DELETE) DELETE Post /posts/:postId', () => {
    // 5-1 (DELETE) check correct parameter
    it('(DELETE) check correct parameter', async () => {
      const postServSpy = jest.spyOn(postsService, 'deletePost');

      await request(app.getHttpServer())
        .delete(`/posts/${mockData.id}`)
        .expect(HttpStatus.OK);

      expect(postServSpy).toHaveBeenCalledWith(mockData.id);
    });

    // 5-2 (DELETE) Post Not Found exception 404 /posts/:postId
    it('(DELETE) Post Not Found exception 404', async () => {
      const postId = '999';
      const res = await request(app.getHttpServer())
        .delete(`/posts/${postId}`)
        .expect(HttpStatus.NOT_FOUND);

      const result = {
        error: 'Not Found',
        message: 'post를 찾을 수 없습니다',
        statusCode: 404,
      };
      expect(res.body).toEqual(result);
    });

    // 5-3 (DELETE) delete Post postsService deletePost 메서드를 호출 하는지
    it('(DELETE) delete Post', async () => {
      const postServSpy = jest.spyOn(postsService, 'deletePost');

      await request(app.getHttpServer())
        .delete(`/posts/${mockData.id}`)
        .expect(HttpStatus.OK);

      expect(postServSpy).toHaveBeenCalled();
    });
  });
});
