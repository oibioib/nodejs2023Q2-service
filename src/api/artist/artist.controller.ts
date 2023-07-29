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
    const { data } = this.artistService.readAll();
    return data;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerGetArtist()
  readOne(@UUIDParam('id') id: string) {
    const { data, errorCode } = this.artistService.readOne(id);

    if (errorCode === HttpStatus.NOT_FOUND) throw new ArtistNotFoundException();

    return data;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerPostArtist()
  createOne(@Body() createArtistDto: CreateArtistDto) {
    const { data } = this.artistService.create(createArtistDto);
    return data;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerPutArtist()
  updateOne(
    @UUIDParam('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const { data, errorCode } = this.artistService.update(id, updateArtistDto);

    if (errorCode === HttpStatus.NOT_FOUND) throw new ArtistNotFoundException();

    return data;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteArtist()
  deleteOne(@UUIDParam('id') id: string) {
    const { errorCode } = this.artistService.delete(id);

    if (errorCode === HttpStatus.NOT_FOUND) throw new ArtistNotFoundException();
  }
}
