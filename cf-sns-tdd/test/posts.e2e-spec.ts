import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PostsModule } from '../src/posts/posts.module';
import { IPost, postItems } from '../src/posts/posts.controller';

describe('PostsController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PostsModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  // e2e 1. Get All Posts Get /posts
  describe('Posts', () => {
    // e2e 1-1 (GET) All Post Get /posts
    it('(GET) All Post Get /posts', async () => {
      const res = await request(app.getHttpServer()).get('/posts').expect(200);
      expect(res.body.length).toBe(5);
    });
  });
});
