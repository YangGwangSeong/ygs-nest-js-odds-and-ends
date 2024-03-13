import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PostsModule } from '../src/posts/posts.module';
import { IPost, postItems } from '../src/posts/posts.controller';

describe('PostsController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostsModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
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
    // e2e 2-1 (GET) get Post
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

    // e2e 2-2 (GET) get Post Not Found exception 404
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

  // e2e 4. Update Post POST /posts
  describe('(PATCH) Update Post /posts/:postId', () => {
    // 4-1 (PATCH) Update Post /posts/:postId
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

    // 4-2 (PATCH) Post Not Found exception 404 /posts/:postId
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
});
