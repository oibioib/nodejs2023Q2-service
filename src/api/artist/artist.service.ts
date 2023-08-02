import { HttpStatus, Injectable } from '@nestjs/common';

import { CreateArtistDto, UpdateArtistDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { DBResponse } from 'src/db/response/db-response';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async readAll() {
    const dbResponse = new DBResponse<Artist[]>();
    const artists = await this.artistRepository.find();
    dbResponse.data = artists;

    return dbResponse;
  }

  async readOne(id: string) {
    const dbResponse = new DBResponse<Artist>();
    const existingArtist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingArtist) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    dbResponse.data = existingArtist;

    return dbResponse;
  }

  async create(createArtistDto: CreateArtistDto) {
    const dbResponse = new DBResponse<Artist>();
    const artistWithDto = this.artistRepository.create(createArtistDto);
    const newArtist = await this.artistRepository.save(artistWithDto);
    dbResponse.data = newArtist;

    return dbResponse;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const dbResponse = new DBResponse<Artist>();

    const existingArtist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingArtist) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    const artistWithNewData = {
      ...existingArtist,
      ...updateArtistDto,
    };

    const artist = await this.artistRepository.save(artistWithNewData);
    dbResponse.data = artist;

    return dbResponse;
  }

  async delete(id: string) {
    const dbResponse = new DBResponse();

    const existingArtist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingArtist) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (existingArtist) {
      await this.artistRepository.remove(existingArtist);
    }

    return dbResponse;
  }
}
