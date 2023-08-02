import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';

import {
  SwaggerAlbumEndpoint,
  SwaggerDeleteAlbum,
  SwaggerGetAlbum,
  SwaggerGetAllAlbums,
  SwaggerPostAlbum,
  SwaggerPutAlbum,
} from './swagger/album.swagger';

import { UUIDParam } from 'src/libs/id';
import { AlbumService } from './album.service';
import { AlbumNotFoundException } from './album.exceptions';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';

@Controller('album')
@SwaggerAlbumEndpoint()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @SwaggerGetAllAlbums()
  async readAll() {
    const { data } = await this.albumService.readAll();
    return data;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerGetAlbum()
  async readOne(@UUIDParam('id') id: string) {
    const { data, errorCode } = await this.albumService.readOne(id);

    if (errorCode === HttpStatus.NOT_FOUND) throw new AlbumNotFoundException();

    return data;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerPostAlbum()
  async createOne(@Body() createAlbumDto: CreateAlbumDto) {
    const { data } = await this.albumService.create(createAlbumDto);
    return data;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerPutAlbum()
  async updateOne(
    @UUIDParam('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const { data, errorCode } = await this.albumService.update(
      id,
      updateAlbumDto,
    );

    if (errorCode === HttpStatus.NOT_FOUND) throw new AlbumNotFoundException();

    return data;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteAlbum()
  async deleteOne(@UUIDParam('id') id: string) {
    const { errorCode } = await this.albumService.delete(id);

    if (errorCode === HttpStatus.NOT_FOUND) throw new AlbumNotFoundException();
  }
}
