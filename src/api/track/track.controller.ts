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
  SwaggerDeleteTrack,
  SwaggerGetAllTracks,
  SwaggerGetTrack,
  SwaggerPostTrack,
  SwaggerPutTrack,
  SwaggerTrackEndpoint,
} from './swagger/track.swagger';

import { UUIDParam } from 'src/utils/id';
import { TrackService } from './track.service';
import { TrackNotFoundException } from './track.exceptions';
import { CreateTrackDto, UpdateTrackDto } from './dto';

@Controller('track')
@SwaggerTrackEndpoint()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @SwaggerGetAllTracks()
  async readAll() {
    const { data } = await this.trackService.readAll();
    return data;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerGetTrack()
  async readOne(@UUIDParam('id') id: string) {
    const { data, errorCode } = await this.trackService.readOne(id);

    if (errorCode === HttpStatus.NOT_FOUND) throw new TrackNotFoundException();

    return data;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerPostTrack()
  async createOne(@Body() createTrackDto: CreateTrackDto) {
    const { data } = await this.trackService.create(createTrackDto);
    return data;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerPutTrack()
  async updateOne(
    @UUIDParam('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const { data, errorCode } = await this.trackService.update(
      id,
      updateTrackDto,
    );

    if (errorCode === HttpStatus.NOT_FOUND) throw new TrackNotFoundException();

    return data;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteTrack()
  async deleteOne(@UUIDParam('id') id: string) {
    const { errorCode } = await this.trackService.delete(id);

    if (errorCode === HttpStatus.NOT_FOUND) throw new TrackNotFoundException();
  }
}
