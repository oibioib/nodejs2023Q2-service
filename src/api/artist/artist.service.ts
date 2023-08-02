import { HttpStatus, Injectable } from '@nestjs/common';

import { CreateArtistDto, UpdateArtistDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { ServiceResponse } from 'src/libs/service-response';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async readAll() {
    const serviceResponse = new ServiceResponse<Artist[]>();
    const artists = await this.artistRepository.find();
    serviceResponse.data = artists;

    return serviceResponse;
  }

  async readOne(id: string) {
    const serviceResponse = new ServiceResponse<Artist>();
    const existingArtist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingArtist) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
      return serviceResponse;
    }

    serviceResponse.data = existingArtist;

    return serviceResponse;
  }

  async create(createArtistDto: CreateArtistDto) {
    const serviceResponse = new ServiceResponse<Artist>();
    const artistWithDto = this.artistRepository.create(createArtistDto);
    const newArtist = await this.artistRepository.save(artistWithDto);
    serviceResponse.data = newArtist;

    return serviceResponse;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const serviceResponse = new ServiceResponse<Artist>();

    const existingArtist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingArtist) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
      return serviceResponse;
    }

    const artistWithNewData = {
      ...existingArtist,
      ...updateArtistDto,
    };

    const artist = await this.artistRepository.save(artistWithNewData);
    serviceResponse.data = artist;

    return serviceResponse;
  }

  async delete(id: string) {
    const serviceResponse = new ServiceResponse();

    const existingArtist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingArtist) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (existingArtist) {
      await this.artistRepository.remove(existingArtist);
    }

    return serviceResponse;
  }

  async getFavoriteArtists() {
    const favoriteArtists = await this.artistRepository.find({
      where: { favorite: true },
    });

    return favoriteArtists;
  }

  async addArtistToFavorites(id: string) {
    const existingArtist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingArtist) {
      return null;
    }

    const track = {
      ...existingArtist,
      favorite: true,
    };

    await this.artistRepository.save(track);

    return id;
  }

  async deleteArtistFromFavorites(id: string) {
    const existingArtist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingArtist) {
      return null;
    }

    const track = {
      ...existingArtist,
      favorite: false,
    };

    await this.artistRepository.save(track);

    return id;
  }
}
