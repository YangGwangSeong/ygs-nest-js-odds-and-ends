import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // moduleFixture : 테스트에 사용되는 환경에서 레이블을 지정하는 용어
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // 1. Creating New Users POST /api/users/create
  describe('Creating New Users POST /api/users/create', () => {
    // 1-1 should create a new user
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post('/users/create')
        .expect(201)
        .send({
          username: 'anson',
          password: 'ansonanson',
          email: 'anson@gmail.com',
        });
    });
  });
});
