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

import { UUIDParam } from 'src/utils/id';
import { ArtistService } from './artist.service';
import { ArtistNotFoundException } from './artist.exceptions';
import { CreateArtistDto, UpdateArtistDto } from './dto';

@SwaggerArtistEndpoint()
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @SwaggerGetAllArtists()
  readAll() {
    return this.artistService.readAll();
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerGetArtist()
  readOne(@UUIDParam('id') id: string) {
    const data = this.artistService.readOne(id);

    if ('error' in data) {
      if (data.error === HttpStatus.NOT_FOUND)
        throw new ArtistNotFoundException();
    }

    return data;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerPostArtist()
  createOne(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerPutArtist()
  updateOne(
    @UUIDParam('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const data = this.artistService.update(id, updateArtistDto);

    if ('error' in data) {
      if (data.error === HttpStatus.NOT_FOUND)
        throw new ArtistNotFoundException();
    }

    return data;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteArtist()
  deleteOne(@UUIDParam('id') id: string) {
    const data = this.artistService.delete(id);

    if (data && 'error' in data) {
      if (data.error === HttpStatus.NOT_FOUND)
        throw new ArtistNotFoundException();
    }
  }
}
