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
  SwaggerArtistEndpoint,
  SwaggerDeleteArtist,
  SwaggerGetAllArtists,
  SwaggerGetArtist,
  SwaggerPostArtist,
  SwaggerPutArtist,
} from './swagger/artist.swagger';

import { UUIDParam } from 'src/libs/id';
import { ArtistService } from './artist.service';
import { ArtistNotFoundException } from './artist.exceptions';
import { CreateArtistDto, UpdateArtistDto } from './dto';

@SwaggerArtistEndpoint()
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @SwaggerGetAllArtists()
  async readAll() {
    const { data } = await this.artistService.readAll();
    return data;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerGetArtist()
  async readOne(@UUIDParam('id') id: string) {
    const { data, errorCode } = await this.artistService.readOne(id);

    if (errorCode === HttpStatus.NOT_FOUND) throw new ArtistNotFoundException();

    return data;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerPostArtist()
  async createOne(@Body() createArtistDto: CreateArtistDto) {
    const { data } = await this.artistService.create(createArtistDto);
    return data;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerPutArtist()
  async updateOne(
    @UUIDParam('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const { data, errorCode } = await this.artistService.update(
      id,
      updateArtistDto,
    );

    if (errorCode === HttpStatus.NOT_FOUND) throw new ArtistNotFoundException();

    return data;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteArtist()
  async deleteOne(@UUIDParam('id') id: string) {
    const { errorCode } = await this.artistService.delete(id);

    if (errorCode === HttpStatus.NOT_FOUND) throw new ArtistNotFoundException();
  }
}
