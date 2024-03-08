import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { SessionEntity } from '../src/typeorm';

describe('UsersController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const sessionRepository = app.get(DataSource).getRepository(SessionEntity);
    app.use(
      session({
        name: 'NESTJS_SESSION_ID',
        secret: '#$1234124',
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 60000,
        },
        store: new TypeormStore().connect(sessionRepository),
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });

  // 2. Authentication
  describe('Authentication', () => {
    // 2-1 should login
    const URL = '/auth/login';
    it('should login', () => {
      return request(app.getHttpServer())
        .post(URL)
        .send({
          email: 'anson@gmail.com',
          password: 'ansonanson',
        })
        .expect(201);
    });
  });
});
