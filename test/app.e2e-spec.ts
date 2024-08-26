import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  //beforeEach:각각의 test(it)전에 한번씩 실행
  //beforeAll:모든 test(it)전에 한번 실행
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }))
    await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('im homeground');
  // });

  //describe는 써도되고 안써도됨. 그냥 이걸 묘사할거다 이정도의미.
  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });

    //it은 test의 별칭이다. it sholud be어쩌고로 시작하기 편해서 이렇게 지음
    test('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title:'test',
          year: 4040,
          genres: ['test'],
        })
        .expect(201)
    });
    test('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title:'test',
          yeasr: 4040,
          genres: ['test'],
        })
        .expect(400)
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404)
    });

  });

  describe('/movies/:id', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
    });
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies/9999')
        .expect(404)
    });


    it('PATCH',() => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({
        title:'updatedTitle'
      })
      .expect(200)
    });
    it('PATCH',() => {
      return request(app.getHttpServer())
      .patch('/movies/9999')
      .expect(404)
    });


    it('DELETE',() => {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200)
    });
    it('DELETE',() => {
      return request(app.getHttpServer())
      .delete('/movies/9999')
      .expect(404)
    });
  })
});
