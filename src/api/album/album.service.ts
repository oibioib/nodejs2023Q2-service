import { HttpStatus, Injectable } from '@nestjs/common';

import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { DBResponse } from 'src/db/response/db-response';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async readAll() {
    const dbResponse = new DBResponse<Album[]>();
    const albums = await this.albumRepository.find();
    dbResponse.data = albums;

    return dbResponse;
  }

  async readOne(id: string) {
    const dbResponse = new DBResponse<Album>();
    const existingAlbum = await this.albumRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingAlbum) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    dbResponse.data = existingAlbum;

    return dbResponse;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const dbResponse = new DBResponse<Album>();
    const albumWithDto = this.albumRepository.create(createAlbumDto);
    const newAlbum = await this.albumRepository.save(albumWithDto);
    dbResponse.data = newAlbum;

    return dbResponse;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const dbResponse = new DBResponse<Album>();

    const existingAlbum = await this.albumRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingAlbum) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    const albumWithNewData = {
      ...existingAlbum,
      ...updateAlbumDto,
    };

    const album = await this.albumRepository.save(albumWithNewData);
    dbResponse.data = album;

    return dbResponse;
  }

  async delete(id: string) {
    const dbResponse = new DBResponse();
    const existingAlbum = await this.albumRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingAlbum) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (existingAlbum) {
      this.albumRepository.remove(existingAlbum);
    }
    return dbResponse;
  }
}
