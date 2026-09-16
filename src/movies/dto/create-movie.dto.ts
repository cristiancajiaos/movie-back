import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateMovieDto {

  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @IsPositive()
  year: number; 
}
