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
  readAll() {
    const { data } = this.trackService.readAll();
    return data;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerGetTrack()
  readOne(@UUIDParam('id') id: string) {
    const { data, errorCode } = this.trackService.readOne(id);

    if (errorCode === HttpStatus.NOT_FOUND) throw new TrackNotFoundException();

    return data;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerPostTrack()
  createOne(@Body() createTrackDto: CreateTrackDto) {
    const { data } = this.trackService.create(createTrackDto);
    return data;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerPutTrack()
  updateOne(
    @UUIDParam('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const { data, errorCode } = this.trackService.update(id, updateTrackDto);

    if (errorCode === HttpStatus.NOT_FOUND) throw new TrackNotFoundException();

    return data;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteTrack()
  deleteOne(@UUIDParam('id') id: string) {
    const { errorCode } = this.trackService.delete(id);

    if (errorCode === HttpStatus.NOT_FOUND) throw new TrackNotFoundException();
  }
}
