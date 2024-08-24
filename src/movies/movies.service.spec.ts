import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  //테스트를 하기전에 실행되는 함수
  //spec.ts는 함수의 unit테스팅(각각 1개씩)을 위한것
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  });

  describe('getOne', () => {
    //it함수전에 여기에 service.create이런거 하면
    //service에 할당되기 전에 실행되서 undefined에러가 뜬다.
    it('should return a movie', () => {
      service.create({
        title: 'TestMovie',
        genres: ['test'],
        year: 2203,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie is not found");
      }
    })
  });

  describe('deleteOne', () => {
    it('should be delete movie', () => {
      service.create({
        title: 'TestMovie',
        genres: ['test'],
        year: 2203,
      });
      const beforeDeleted = service.getAll().length;
      service.deleteOne(1);
      const deletedMovies = service.getAll().length;
      expect(deletedMovies).toEqual(beforeDeleted - 1);
    });
    it('should be return 404 error', () => {
      try {
        service.deleteOne(999)
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  });

  describe('create', () => {
    it('should be create movie', () => {
      const before = service.getAll().length;
      service.create({
        title: 'TestMovie',
        genres: ['test'],
        year: 2203,
      });
      const after = service.getAll().length;
      expect(after).toBeGreaterThan(before);
    })
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'TestMovie',
        genres: ['test'],
        year: 2203,
      });
      service.updateOne(1, {
        title: 'updatedMovie',
        year: 4444,
      });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updatedMovie')
    });
    it('should be return 404 error', () => {
      try {
        service.updateOne(999,{})
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

});
