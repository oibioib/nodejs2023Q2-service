import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ServiceResponse } from 'src/libs/service-response';
import { CreateTrackDto, UpdateTrackDto } from './dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async readAll() {
    const serviceResponse = new ServiceResponse<Track[]>();
    const tracks = await this.trackRepository.find();
    serviceResponse.data = tracks;
    return serviceResponse;
  }

  async readOne(id: string) {
    const serviceResponse = new ServiceResponse<Track>();
    const existingTrack = await this.trackRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingTrack) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
      return serviceResponse;
    }

    serviceResponse.data = existingTrack;
    return serviceResponse;
  }

  async create(createTrackDto: CreateTrackDto) {
    const serviceResponse = new ServiceResponse<Track>();
    const trackWithDto = this.trackRepository.create(createTrackDto);
    const newTrack = await this.trackRepository.save(trackWithDto);
    serviceResponse.data = newTrack;
    return serviceResponse;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const serviceResponse = new ServiceResponse<Track>();
    const existingTrack = await this.trackRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingTrack) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
      return serviceResponse;
    }

    const trackWithNewData = {
      ...existingTrack,
      ...updateTrackDto,
    };

    const track = await this.trackRepository.save(trackWithNewData);
    serviceResponse.data = track;

    return serviceResponse;
  }

  async delete(id: string) {
    const serviceResponse = new ServiceResponse();

    const existingTrack = await this.trackRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingTrack) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (existingTrack) {
      await this.trackRepository.remove(existingTrack);
    }

    return serviceResponse;
  }

  async getFavoriteTracks() {
    const favoriteTracks = await this.trackRepository.find({
      where: { favorite: true },
    });

    return favoriteTracks;
  }

  async addTrackToFavorites(id: string) {
    const existingTrack = await this.trackRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingTrack) {
      return null;
    }

    const track = {
      ...existingTrack,
      favorite: true,
    };

    await this.trackRepository.save(track);

    return id;
  }

  async deleteTrackFromFavorites(id: string) {
    const existingTrack = await this.trackRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingTrack) {
      return null;
    }

    const track = {
      ...existingTrack,
      favorite: false,
    };

    await this.trackRepository.save(track);

    return id;
  }
}
