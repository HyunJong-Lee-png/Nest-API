import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

//Controller의 인수값이 entry point가 되므로 값을 넣으면 그 값 url부터 시작이라 보통은 비워둔다. 
@Controller('movies')
export class MoviesController {

  //이 식과 아래식은 같다.
  //   private readonly moviesService: MoviesService; //선언만

  //   constructor(moviesService: MoviesService) {
  //     this.moviesService = moviesService;
  //   }
  constructor(private readonly moviesService: MoviesService) { }

  @Get()
  allMovies(): Movie[] {
    return this.moviesService.getAll();
  };

  //@Param('id') movieId:string 이뜻은 id파라미터의 값을 movieId에 넣고 그 타입은 string이란 의미
  @Get('/:id')
  getMovie(@Param('id') movieId: number, @Req() req): Movie {
    return this.moviesService.getOne(movieId);
  };

  @Post()
  createMovie(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  };

  @Delete('/:id')
  deleteMovie(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  };

  @Patch('/:id')
  updateMovie(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto): boolean {
    return this.moviesService.updateOne(movieId, updateData);
  };

}
