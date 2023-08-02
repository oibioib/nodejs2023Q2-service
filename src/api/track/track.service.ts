import { HttpStatus, Injectable } from '@nestjs/common';

import { CreateTrackDto, UpdateTrackDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { DBResponse } from 'src/db/response/db-response';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async readAll() {
    const dbResponse = new DBResponse<Track[]>();
    const tracks = await this.trackRepository.find();
    dbResponse.data = tracks;
    return dbResponse;
  }

  async readOne(id: string) {
    const dbResponse = new DBResponse<Track>();
    const existingTrack = await this.trackRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingTrack) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    dbResponse.data = existingTrack;
    return dbResponse;
  }

  async create(createTrackDto: CreateTrackDto) {
    const dbResponse = new DBResponse<Track>();
    const trackWithDto = this.trackRepository.create(createTrackDto);
    const newTrack = await this.trackRepository.save(trackWithDto);
    dbResponse.data = newTrack;
    return dbResponse;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const dbResponse = new DBResponse<Track>();
    const existingTrack = await this.trackRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingTrack) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    const trackWithNewData = {
      ...existingTrack,
      ...updateTrackDto,
    };

    const track = await this.trackRepository.save(trackWithNewData);
    dbResponse.data = track;

    return dbResponse;
  }

  async delete(id: string) {
    const dbResponse = new DBResponse();

    const existingTrack = await this.trackRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingTrack) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (existingTrack) {
      await this.trackRepository.remove(existingTrack);
    }

    return dbResponse;
  }
}
