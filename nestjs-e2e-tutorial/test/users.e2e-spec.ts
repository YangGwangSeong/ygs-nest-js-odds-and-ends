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
    const CREATE_USER_URL = '/users/create';
    // 1-1 should create a new user
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'anson',
          password: 'ansonanson',
          email: 'anson@gmail.com',
        })
        .expect(201);
    });

    // 1-2 should return a 400 when invalid username
    it('should return a 400 when invalid username is provided', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'an',
          password: 'ansonanson',
          email: 'anson@gmail.com',
        })
        .expect(400);
    });

    // 1-3 should return a 400 when invalid password is provided
    it('should return a 400 when invalid password is provided', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'anson_nestjs',
          password: 'sada',
          email: 'anson@gmail.com',
        })
        .expect(400);
    });

    // 1-4 should return a 400 when invalid email is provided
    it('should return a 400 when invalid email is provided', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'anson_nestjs',
          password: 'ansonanson',
          email: 'anson',
        })
        .expect(400);
    });
  });
});
