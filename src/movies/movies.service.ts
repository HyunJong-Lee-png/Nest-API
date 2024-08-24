import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  private id: number = 1;

  getAll(): Movie[] {
    return this.movies;
  };

  getOne(movieId: number): Movie {
    const movie = this.movies.find(movie => movie.id === movieId);
    console.log(movie);
    if (!movie) {
      throw new NotFoundException("Movie is not found");
    };
    return movie;
  };

  deleteOne(movieId: number): boolean {
    this.getOne(movieId);
    this.movies = this.movies.filter(movie => movie.id !== movieId);
    return true;
  };

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.id,
      ...movieData,
    });
    this.id += 1;
  };

  updateOne(movieId: number, movieData: UpdateMovieDto) {
    this.getOne(movieId);
    this.movies = this.movies.map(
      movie => movie.id !== movieId
        ? movie : { ...movie, ...movieData });
    return true;
  }
}
