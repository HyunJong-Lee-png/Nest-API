import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

/* 이렇게 ?:로 쓰는 대신에
export class UpdateMovieDto {

  @IsString()
  readonly title?: string;

  @IsNumber()
  readonly year?: number;
  
  @IsString({ each: true })
  readonly genres?: string[];
}*/

//이렇게 존나 간단하게 쓸 수 있다
export class UpdateMovieDto extends PartialType(CreateMovieDto){
}
