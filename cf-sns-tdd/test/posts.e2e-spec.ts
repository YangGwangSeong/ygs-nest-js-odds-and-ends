import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PostsModule } from '../src/posts/posts.module';
import { IPost, postItems } from '../src/posts/posts.controller';
import { PostsService } from '../src/posts/posts.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from '../src/posts/entities/posts.entity';

describe('PostsController E2E Test', () => {
  let app: INestApplication;
  let postsService: PostsService;

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
              entities: [PostsModel],
              synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
            };

            return option;
          },
        }),
        PostsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    postsService = moduleFixture.get<PostsService>(PostsService);
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
      expect(res.body.length).toBe(postItems.length);
    });
  });

  // e2e 2 (GET) get Post /posts/:postId
  describe('(GET) /posts/:postId', () => {
    // e2e 2-1 check correct parameter
    it('(GET) check correct parameter', async () => {
      const postId = '1';
      const postServSpy = jest.spyOn(postsService, 'getPostById');
      await request(app.getHttpServer())
        .get(`/posts/${postId}`)
        .expect(HttpStatus.OK);

      expect(postServSpy).toHaveBeenCalledWith(Number(postId));
    });

    // e2e 2-2 (GET) get Post
    it('(GET) get Post', async () => {
      const postId = '1';
      const expectedPost = postItems.find(
        (post) => post.id === parseInt(postId),
      );

      const res = await request(app.getHttpServer())
        .get(`/posts/${postId}`)
        .expect(HttpStatus.OK);

      expect(res.body).toEqual(expectedPost);
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
    // e2e 3-1 (POST) Create Post /posts
    it('(POST) Create Post /posts', async () => {
      const newPost: IPost = {
        id: postItems[postItems.length - 1].id + 1,
        author: 'newjeans_official',
        title: '뉴진스 혜인',
        content: '장난 치고 있는 혜인',
        likeCount: 0,
        commentCount: 0,
      };

      const res = await request(app.getHttpServer())
        .post('/posts')
        .send(newPost)
        .expect(HttpStatus.CREATED);

      expect(res.body.id).toEqual(newPost.id);
      expect(res.body.title).toEqual(newPost.title);
    });
  });

  // e2e 4. Update Post PATCH /posts/:postId
  describe('(PATCH) Update Post /posts/:postId', () => {
    // 4-1 (PATCH) check correct parameter
    it('(PATCH) check correct parameter', async () => {
      const mockPostId = '2';
      const mockUpdatePost = {
        title: '헬로우월드',
        content: 'hello',
        author: 'me',
      };
      const updatePost = postItems.find(
        (item) => item.id === Number(mockPostId),
      );
      updatePost.title = mockUpdatePost.title;

      const postServSpy = jest.spyOn(postsService, 'updatePost');

      await request(app.getHttpServer())
        .patch(`/posts/${mockPostId}`)
        .send(updatePost)
        .expect(HttpStatus.OK);

      expect(postServSpy).toHaveBeenCalledWith(Number(mockPostId), updatePost);
    });

    // 4-2 (PATCH) Update Post /posts/:postId
    it('(PATCH) Update Post /posts/:postId', async () => {
      const mockPostId = '2';
      const mockUpdatePost = {
        title: '헬로우월드',
        content: 'hello',
        author: 'me',
      };
      const updatePost = postItems.find(
        (item) => item.id === Number(mockPostId),
      );
      updatePost.title = mockUpdatePost.title;

      const res = await request(app.getHttpServer())
        .patch(`/posts/${mockPostId}`)
        .send(updatePost)
        .expect(HttpStatus.OK);

      expect(res.body.title).toEqual(mockUpdatePost.title);
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
  describe('(DELETE) Update Post /posts/:postId', () => {
    // 5-1 (DELETE) check correct parameter
    it('(DELETE) check correct parameter', async () => {
      const mockPostId = '2';

      const postServSpy = jest.spyOn(postsService, 'deletePost');

      await request(app.getHttpServer())
        .delete(`/posts/${mockPostId}`)
        .expect(HttpStatus.OK);

      expect(postServSpy).toHaveBeenCalledWith(Number(mockPostId));
    });

    // 5-2 (DELETE) delete Post
    it('(DELETE) delete Post', async () => {
      const mockPostId = '2';

      await request(app.getHttpServer())
        .delete(`/posts/${mockPostId}`)
        .expect(HttpStatus.OK);
    });

    // 5-3 (DELETE) Post Not Found exception 404 /posts/:postId
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
  });
});
