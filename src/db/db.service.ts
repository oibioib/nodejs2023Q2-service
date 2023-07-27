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
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favoritesArtists: [],
  favoritesAlbums: [],
  favoritesTracks: [],
};

@Injectable()
export class DbService {
  constructor() {
    this.users = data.users;
    this.artists = data.artists;
    this.tracks = data.tracks;
    this.albums = data.albums;
    this.favoritesArtists = data.favoritesArtists;
    this.favoritesAlbums = data.favoritesAlbums;
    this.favoritesTracks = data.favoritesTracks;
  }

  private users: User[];
  private artists: Artist[];
  private tracks: Track[];
  private albums: Album[];
  private favoritesArtists: string[];
  private favoritesAlbums: string[];
  private favoritesTracks: string[];

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
      this._favoritesDeleteArtist(id);
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
      this._favoritesDeleteTrack(id);
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
      this._favoritesDeleteAlbum(id);
    }
  }

  _albumsDeleteArtist(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }

  // FAVORITES
  favoritesGetAll() {
    const artistsIds = this.favoritesArtists;
    const albumsIds = this.favoritesAlbums;
    const tracksIds = this.favoritesTracks;

    const artists = artistsIds.map((artistsId) => this.artistGetOne(artistsId));
    const albums = albumsIds.map((albumsId) => this.albumGetOne(albumsId));
    const tracks = tracksIds.map((tracksId) => this.trackGetOne(tracksId));

    return {
      artists,
      albums,
      tracks,
    };
  }

  favoritesAddTrack(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      return {
        error: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    if (trackIndex >= 0) {
      this.favoritesTracks.push(id);
      return id;
    }
  }

  favoritesAddAlbum(id: string) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      return {
        error: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    if (albumIndex >= 0) {
      this.favoritesAlbums.push(id);
      return id;
    }
  }

  favoritesAddArtist(id: string) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      return {
        error: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    if (artistIndex >= 0) {
      this.favoritesArtists.push(id);
      return id;
    }
  }

  favoritesDeleteTrack(id: string) {
    const favoriteTrackIndex = this.favoritesTracks.findIndex(
      (favoritesTrack) => favoritesTrack === id,
    );

    if (favoriteTrackIndex === -1) {
      return {
        error: HttpStatus.NOT_FOUND,
      };
    }

    if (favoriteTrackIndex >= 0) {
      this.favoritesTracks.splice(favoriteTrackIndex, 1);
    }
  }

  favoritesDeleteAlbum(id: string) {
    const favoriteAlbumIndex = this.favoritesAlbums.findIndex(
      (favoritesAlbum) => favoritesAlbum === id,
    );

    if (favoriteAlbumIndex === -1) {
      return {
        error: HttpStatus.NOT_FOUND,
      };
    }

    if (favoriteAlbumIndex >= 0) {
      this.favoritesAlbums.splice(favoriteAlbumIndex, 1);
    }
  }

  favoritesDeleteArtist(id: string) {
    const favoriteArtistIndex = this.favoritesArtists.findIndex(
      (favoritesArtist) => favoritesArtist === id,
    );

    if (favoriteArtistIndex === -1) {
      return {
        error: HttpStatus.NOT_FOUND,
      };
    }

    if (favoriteArtistIndex >= 0) {
      this.favoritesArtists.splice(favoriteArtistIndex, 1);
    }
  }

  _favoritesDeleteTrack(id: string) {
    const favoriteTrackIndex = this.favoritesTracks.findIndex(
      (favoritesTrack) => favoritesTrack === id,
    );

    if (favoriteTrackIndex >= 0) {
      this.favoritesTracks.splice(favoriteTrackIndex, 1);
    }
  }

  _favoritesDeleteAlbum(id: string) {
    const favoriteAlbumIndex = this.favoritesAlbums.findIndex(
      (favoritesAlbum) => favoritesAlbum === id,
    );

    if (favoriteAlbumIndex >= 0) {
      this.favoritesAlbums.splice(favoriteAlbumIndex, 1);
    }
  }

  _favoritesDeleteArtist(id: string) {
    const favoriteArtistIndex = this.favoritesArtists.findIndex(
      (favoritesArtist) => favoritesArtist === id,
    );

    if (favoriteArtistIndex >= 0) {
      this.favoritesArtists.splice(favoriteArtistIndex, 1);
    }
  }
}
