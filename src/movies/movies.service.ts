import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

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

  async findOne(id: string) {
    if (isUUID(id)) {
      const movie = await this.movieRepository.findOneBy({id: id});

      if (!movie) {
        throw new NotFoundException(`Movie with ID ${id} not found`);
      }

      return movie;
    } else {
      throw new BadRequestException(`ID given is not a UUID valid id`);
    }
    
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  async remove(id: string) {
    const movie = this.findOne(id);
    await this.movieRepository.delete({id: id});
    return {
      message: `Movie with ID ${id} deleted`
    }
  }

  handleDBRequests(error) {
    if (error.code == '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException(error.detail);
  }
}
