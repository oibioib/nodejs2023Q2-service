import { HttpStatus, Injectable } from '@nestjs/common';

import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { ServiceResponse } from 'src/libs/service-response';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async readAll() {
    const serviceResponse = new ServiceResponse<Album[]>();
    const albums = await this.albumRepository.find();
    serviceResponse.data = albums;

    return serviceResponse;
  }

  async readOne(id: string) {
    const serviceResponse = new ServiceResponse<Album>();
    const existingAlbum = await this.albumRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingAlbum) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
      return serviceResponse;
    }

    serviceResponse.data = existingAlbum;

    return serviceResponse;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const serviceResponse = new ServiceResponse<Album>();
    const albumWithDto = this.albumRepository.create(createAlbumDto);
    const newAlbum = await this.albumRepository.save(albumWithDto);
    serviceResponse.data = newAlbum;

    return serviceResponse;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const serviceResponse = new ServiceResponse<Album>();

    const existingAlbum = await this.albumRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingAlbum) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
      return serviceResponse;
    }

    const albumWithNewData = {
      ...existingAlbum,
      ...updateAlbumDto,
    };

    const album = await this.albumRepository.save(albumWithNewData);
    serviceResponse.data = album;

    return serviceResponse;
  }

  async delete(id: string) {
    const serviceResponse = new ServiceResponse();
    const existingAlbum = await this.albumRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingAlbum) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (existingAlbum) {
      await this.albumRepository.remove(existingAlbum);
    }
    return serviceResponse;
  }

  async getFavoriteAlbums() {
    const favoriteAlbums = await this.albumRepository.find({
      where: { favorite: true },
    });

    return favoriteAlbums;
  }

  async addAlbumToFavorites(id: string) {
    const existingAlbum = await this.albumRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingAlbum) {
      return null;
    }

    const track = {
      ...existingAlbum,
      favorite: true,
    };

    await this.albumRepository.save(track);

    return id;
  }

  async deleteAlbumFromFavorites(id: string) {
    const existingAlbum = await this.albumRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingAlbum) {
      return null;
    }

    const track = {
      ...existingAlbum,
      favorite: false,
    };

    await this.albumRepository.save(track);

    return id;
  }
}
