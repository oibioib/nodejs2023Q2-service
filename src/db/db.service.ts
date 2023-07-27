import { HttpStatus, Injectable } from '@nestjs/common';

import { getDate } from 'src/utils/date';
import { generateId } from 'src/utils/id';
import { getUserToResponse } from 'src/utils/user';

import { Artist } from 'src/api/artist/entities/artist.entity';
import { CreateArtistDto, UpdateArtistDto } from 'src/api/artist/dto';

import { Track } from 'src/api/track/entities/track.entity';
import { CreateTrackDto, UpdateTrackDto } from 'src/api/track/dto';

import { User } from 'src/api/user/entities/user.entity';
import { CreateUserDto, UpdatePasswordDto } from 'src/api/user/dto';

import { Album } from 'src/api/album/entities/album.entity';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/api/album/dto';

const data = {
  users: [
    {
      id: '30397502-11fc-474e-b9be-f408b9c59f3d',
      login: 'login',
      password: 'password',
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  artists: [
    {
      id: '30397502-11fc-474e-b9be-f408b9c59f3d',
      name: 'Artist',
      grammy: true,
    },
  ],
  tracks: [
    {
      id: '30397502-11fc-474e-b9be-f408b9c59f3d',
      name: 'Track',
      artistId: null,
      albumId: null,
      duration: 123,
    },
  ],
  albums: [],
};

@Injectable()
export class DbService {
  constructor() {
    this.users = data.users;
    this.artists = data.artists;
    this.tracks = data.tracks;
    this.albums = data.albums;
  }

  private users: User[];
  private artists: Artist[];
  private tracks: Track[];
  private albums: Album[];

  // USER
  userGetAll() {
    return this.users.map(getUserToResponse);
  }

  userGetOne(id: string) {
    const existingUser = this.users.find((user) => user.id === id);

    if (!existingUser)
      return {
        error: HttpStatus.NOT_FOUND,
      };

    return getUserToResponse(existingUser);
  }

  userCreate(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: generateId(),
      version: 1,
      createdAt: getDate(),
      updatedAt: getDate(),
      ...createUserDto,
    };

    this.users.push(newUser);

    return getUserToResponse(newUser);
  }

  userUpdate(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1)
      return {
        error: HttpStatus.NOT_FOUND,
      };

    const user = { ...this.users[userIndex] };
    const { password, version } = user;
    const { oldPassword, newPassword } = updatePasswordDto;

    if (password !== oldPassword)
      return {
        error: HttpStatus.FORBIDDEN,
      };

    const userWithNewData = {
      ...user,
      password: newPassword,
      version: version + 1,
      updatedAt: getDate(),
    };

    this.users[userIndex] = userWithNewData;

    return getUserToResponse(userWithNewData);
  }

  userDelete(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return {
        error: HttpStatus.NOT_FOUND,
      };
    }

    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
    }
  }

  // ARTIST
  artistGetAll() {
    return this.artists;
  }

  artistGetOne(id: string) {
    const existingArtist = this.artists.find((artist) => artist.id === id);

    if (!existingArtist)
      return {
        error: HttpStatus.NOT_FOUND,
      };

    return existingArtist;
  }

  artistCreate(createArtistDto: CreateArtistDto) {
    const newArtist: Artist = {
      id: generateId(),
      ...createArtistDto,
    };

    this.artists.push(newArtist);

    return newArtist;
  }

  artistUpdate(id: string, updateArtistDto: UpdateArtistDto) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1)
      return {
        error: HttpStatus.NOT_FOUND,
      };

    const artistWithNewData = {
      ...this.artists[artistIndex],
      ...updateArtistDto,
    };

    this.artists[artistIndex] = artistWithNewData;

    return artistWithNewData;
  }

  artistDelete(id: string) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      return {
        error: HttpStatus.NOT_FOUND,
      };
    }

    if (artistIndex >= 0) {
      this.artists.splice(artistIndex, 1);
      this._tracksDeleteArtist(id);
      this._albumsDeleteArtist(id);
    }
  }

  // TRACK
  trackGetAll() {
    return this.tracks;
  }

  trackGetOne(id: string) {
    const existingTrack = this.tracks.find((track) => track.id === id);

    if (!existingTrack)
      return {
        error: HttpStatus.NOT_FOUND,
      };

    return existingTrack;
  }

  trackCreate(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: generateId(),
      ...createTrackDto,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  trackUpdate(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1)
      return {
        error: HttpStatus.NOT_FOUND,
      };

    const trackWithNewData = {
      ...this.tracks[trackIndex],
      ...updateTrackDto,
    };

    this.tracks[trackIndex] = trackWithNewData;

    return trackWithNewData;
  }

  trackDelete(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      return {
        error: HttpStatus.NOT_FOUND,
      };
    }

    if (trackIndex >= 0) {
      this.tracks.splice(trackIndex, 1);
    }
  }

  _tracksDeleteArtist(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  _tracksDeleteAlbum(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }

  // ALBUM
  albumGetAll() {
    return this.albums;
  }

  albumGetOne(id: string) {
    const existingAlbum = this.albums.find((album) => album.id === id);

    if (!existingAlbum)
      return {
        error: HttpStatus.NOT_FOUND,
      };

    return existingAlbum;
  }

  albumCreate(createAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: generateId(),
      ...createAlbumDto,
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }

  albumUpdate(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1)
      return {
        error: HttpStatus.NOT_FOUND,
      };

    const albumWithNewData = {
      ...this.albums[albumIndex],
      ...updateAlbumDto,
    };

    this.albums[albumIndex] = albumWithNewData;

    return albumWithNewData;
  }

  albumDelete(id: string) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      return {
        error: HttpStatus.NOT_FOUND,
      };
    }

    if (albumIndex >= 0) {
      this.albums.splice(albumIndex, 1);
      this._tracksDeleteAlbum(id);
    }
  }

  _albumsDeleteArtist(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
