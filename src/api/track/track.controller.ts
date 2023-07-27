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
import { TrackService } from './track.service';
import { UUIDParam } from 'src/utils/id';
import { TrackNotFoundException } from './track.exceptions';
import { CreateTrackDto, UpdateTrackDto } from './dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  readAll() {
    return this.trackService.readAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  readOne(@UUIDParam('id') id: string) {
    const data = this.trackService.readOne(id);

    if ('error' in data) {
      if (data.error === HttpStatus.NOT_FOUND)
        throw new TrackNotFoundException();
    }

    return data;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateOne(
    @UUIDParam('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const data = this.trackService.update(id, updateTrackDto);

    if ('error' in data) {
      if (data.error === HttpStatus.NOT_FOUND)
        throw new TrackNotFoundException();
    }

    return data;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@UUIDParam('id') id: string) {
    const data = this.trackService.delete(id);

    if (data && 'error' in data) {
      if (data.error === HttpStatus.NOT_FOUND)
        throw new TrackNotFoundException();
    }
  }
}
