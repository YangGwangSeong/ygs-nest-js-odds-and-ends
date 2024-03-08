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
    let cookie = '';
    it('should login', (done) => {
      return request(app.getHttpServer())
        .post(URL)
        .send({
          email: 'anson@gmail.com',
          password: 'ansonanson',
        })
        .expect(201)
        .end((err, res) => {
          console.log(res.headers);
          cookie = res.headers['set-cookie'];
          done();
        });
    });

    // 2-2 should visit /api/users and return 200
    it('should visit /api/users and return 200', async () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .set('Cookie', cookie)
        .expect(200);
    });
  });
});
