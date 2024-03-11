import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('PostsController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  // e2e 1. Get All Posts Get /posts
  describe('Get All Post Get /posts', () => {
    // e2e 1-1 shoulde be get all posts
    it('shoulde be get all posts', () => {
      return request(app.getHttpServer()).get('/posts').expect(200);
    });
  });
});
