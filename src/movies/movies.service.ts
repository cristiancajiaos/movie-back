import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ) {

  }
  async create(createMovieDto: CreateMovieDto) {
    try {
      const movie = this.movieRepository.create(createMovieDto);
      await this.movieRepository.save(movie);
      return movie; 
    } catch (error) {
      this.handleDBRequests(error);
    }
    
  }

  findAll() {
    return this.movieRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} movie`;
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: string) {
    return `This action removes a #${id} movie`;
  }

  handleDBRequests(error) {
    if (error.code == '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException(error.detail);
  }
}
