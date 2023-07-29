import { HttpStatus, Injectable } from '@nestjs/common';

import { getDate } from 'src/utils/date';
import { generateId } from 'src/utils/id';
import { getUserToResponse } from 'src/utils/user';
import { DBResponse } from './response/db-response';

import { User } from 'src/api/user/entities/user.entity';
import { UserWithoutPassword } from 'src/api/user/entities/user-without-password.entity copy';
import { CreateUserDto, UpdatePasswordDto } from 'src/api/user/dto';

import { Artist } from 'src/api/artist/entities/artist.entity';
import { CreateArtistDto, UpdateArtistDto } from 'src/api/artist/dto';

import { Track } from 'src/api/track/entities/track.entity';
import { CreateTrackDto, UpdateTrackDto } from 'src/api/track/dto';

import { Album } from 'src/api/album/entities/album.entity';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/api/album/dto';

import { Favorites } from 'src/api/favorites/entities/favorites.entity';

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
    const dbResponse = new DBResponse<UserWithoutPassword[]>();
    dbResponse.data = this.users.map(getUserToResponse);

    return dbResponse;
  }

  userGetOne(id: string) {
    const dbResponse = new DBResponse<UserWithoutPassword>();

    const existingUser = this.users.find((user) => user.id === id);

    if (!existingUser) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    dbResponse.data = getUserToResponse(existingUser);

    return dbResponse;
  }

  userCreate(createUserDto: CreateUserDto) {
    const dbResponse = new DBResponse<UserWithoutPassword>();

    const newUser: User = {
      id: generateId(),
      version: 1,
      createdAt: getDate(),
      updatedAt: getDate(),
      ...createUserDto,
    };

    this.users.push(newUser);

    dbResponse.data = getUserToResponse(newUser);

    return dbResponse;
  }

  userUpdate(id: string, updatePasswordDto: UpdatePasswordDto) {
    const dbResponse = new DBResponse<UserWithoutPassword>();

    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    const user = { ...this.users[userIndex] };
    const { password, version } = user;
    const { oldPassword, newPassword } = updatePasswordDto;

    if (password !== oldPassword) {
      dbResponse.errorCode = HttpStatus.FORBIDDEN;
      return dbResponse;
    }

    const userWithNewData = {
      ...user,
      password: newPassword,
      version: version + 1,
      updatedAt: getDate(),
    };

    this.users[userIndex] = userWithNewData;

    dbResponse.data = getUserToResponse(userWithNewData);

    return dbResponse;
  }

  userDelete(id: string) {
    const dbResponse = new DBResponse();

    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
    }

    return dbResponse;
  }

  // ARTIST
  artistGetAll() {
    const dbResponse = new DBResponse<Artist[]>();

    dbResponse.data = this.artists;

    return dbResponse;
  }

  artistGetOne(id: string) {
    const dbResponse = new DBResponse<Artist>();

    const existingArtist = this.artists.find((artist) => artist.id === id);

    if (!existingArtist) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    dbResponse.data = existingArtist;

    return dbResponse;
  }

  artistCreate(createArtistDto: CreateArtistDto) {
    const dbResponse = new DBResponse<Artist>();

    const newArtist: Artist = {
      id: generateId(),
      ...createArtistDto,
    };

    this.artists.push(newArtist);

    dbResponse.data = newArtist;

    return dbResponse;
  }

  artistUpdate(id: string, updateArtistDto: UpdateArtistDto) {
    const dbResponse = new DBResponse<Artist>();

    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    const artistWithNewData = {
      ...this.artists[artistIndex],
      ...updateArtistDto,
    };

    this.artists[artistIndex] = artistWithNewData;

    dbResponse.data = artistWithNewData;

    return dbResponse;
  }

  artistDelete(id: string) {
    const dbResponse = new DBResponse();

    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (artistIndex >= 0) {
      this.artists.splice(artistIndex, 1);
      this._tracksDeleteArtist(id);
      this._albumsDeleteArtist(id);
      this._favoritesDeleteArtist(id);
    }

    return dbResponse;
  }

  // TRACK
  trackGetAll() {
    const dbResponse = new DBResponse<Track[]>();

    dbResponse.data = this.tracks;

    return dbResponse;
  }

  trackGetOne(id: string) {
    const dbResponse = new DBResponse<Track>();

    const existingTrack = this.tracks.find((track) => track.id === id);

    if (!existingTrack) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    dbResponse.data = existingTrack;

    return dbResponse;
  }

  trackCreate(createTrackDto: CreateTrackDto) {
    const dbResponse = new DBResponse<Track>();

    const newTrack: Track = {
      id: generateId(),
      ...createTrackDto,
    };

    this.tracks.push(newTrack);

    dbResponse.data = newTrack;

    return dbResponse;
  }

  trackUpdate(id: string, updateTrackDto: UpdateTrackDto) {
    const dbResponse = new DBResponse<Track>();

    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    const trackWithNewData = {
      ...this.tracks[trackIndex],
      ...updateTrackDto,
    };

    this.tracks[trackIndex] = trackWithNewData;

    dbResponse.data = trackWithNewData;

    return dbResponse;
  }

  trackDelete(id: string) {
    const dbResponse = new DBResponse();

    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (trackIndex >= 0) {
      this.tracks.splice(trackIndex, 1);
      this._favoritesDeleteTrack(id);
    }

    return dbResponse;
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
    const dbResponse = new DBResponse<Album[]>();

    dbResponse.data = this.albums;

    return dbResponse;
  }

  albumGetOne(id: string) {
    const dbResponse = new DBResponse<Album>();

    const existingAlbum = this.albums.find((album) => album.id === id);

    if (!existingAlbum) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    dbResponse.data = existingAlbum;

    return dbResponse;
  }

  albumCreate(createAlbumDto: CreateAlbumDto) {
    const dbResponse = new DBResponse<Album>();

    const newAlbum: Album = {
      id: generateId(),
      ...createAlbumDto,
    };

    this.albums.push(newAlbum);

    dbResponse.data = newAlbum;

    return dbResponse;
  }

  albumUpdate(id: string, updateAlbumDto: UpdateAlbumDto) {
    const dbResponse = new DBResponse<Album>();

    const albumIndex = this.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    const albumWithNewData = {
      ...this.albums[albumIndex],
      ...updateAlbumDto,
    };

    this.albums[albumIndex] = albumWithNewData;

    dbResponse.data = albumWithNewData;

    return dbResponse;
  }

  albumDelete(id: string) {
    const dbResponse = new DBResponse();

    const albumIndex = this.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (albumIndex >= 0) {
      this.albums.splice(albumIndex, 1);
      this._tracksDeleteAlbum(id);
      this._favoritesDeleteAlbum(id);
    }

    return dbResponse;
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
    const dbResponse = new DBResponse<Favorites>();

    const artistsIds = this.favoritesArtists;
    const albumsIds = this.favoritesAlbums;
    const tracksIds = this.favoritesTracks;

    const artists = artistsIds
      .map((artistsId) => this.artistGetOne(artistsId).data)
      .filter((artist) => artist) as Artist[];
    const albums = albumsIds
      .map((albumsId) => this.albumGetOne(albumsId).data)
      .filter((album) => album) as Album[];
    const tracks = tracksIds
      .map((tracksId) => this.trackGetOne(tracksId).data)
      .filter((artist) => artist) as Track[];

    dbResponse.data = {
      artists,
      albums,
      tracks,
    };

    return dbResponse;
  }

  favoritesAddTrack(id: string) {
    const dbResponse = new DBResponse<string>();

    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      dbResponse.errorCode = HttpStatus.UNPROCESSABLE_ENTITY;
    }

    if (trackIndex >= 0) {
      this.favoritesTracks.push(id);
      dbResponse.data = id;
    }

    return dbResponse;
  }

  favoritesAddAlbum(id: string) {
    const dbResponse = new DBResponse<string>();

    const albumIndex = this.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      dbResponse.errorCode = HttpStatus.UNPROCESSABLE_ENTITY;
    }

    if (albumIndex >= 0) {
      this.favoritesAlbums.push(id);
      dbResponse.data = id;
    }

    return dbResponse;
  }

  favoritesAddArtist(id: string) {
    const dbResponse = new DBResponse<string>();

    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      dbResponse.errorCode = HttpStatus.UNPROCESSABLE_ENTITY;
    }

    if (artistIndex >= 0) {
      this.favoritesArtists.push(id);
      dbResponse.data = id;
    }

    return dbResponse;
  }

  favoritesDeleteTrack(id: string) {
    const dbResponse = new DBResponse<string>();

    const favoriteTrackIndex = this.favoritesTracks.findIndex(
      (favoritesTrack) => favoritesTrack === id,
    );

    if (favoriteTrackIndex === -1) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (favoriteTrackIndex >= 0) {
      this.favoritesTracks.splice(favoriteTrackIndex, 1);
    }

    return dbResponse;
  }

  favoritesDeleteAlbum(id: string) {
    const dbResponse = new DBResponse<string>();

    const favoriteAlbumIndex = this.favoritesAlbums.findIndex(
      (favoritesAlbum) => favoritesAlbum === id,
    );

    if (favoriteAlbumIndex === -1) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (favoriteAlbumIndex >= 0) {
      this.favoritesAlbums.splice(favoriteAlbumIndex, 1);
    }

    const {} = this.favoritesGetAll();

    return dbResponse;
  }

  favoritesDeleteArtist(id: string) {
    const dbResponse = new DBResponse<string>();

    const favoriteArtistIndex = this.favoritesArtists.findIndex(
      (favoritesArtist) => favoritesArtist === id,
    );

    if (favoriteArtistIndex === -1) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (favoriteArtistIndex >= 0) {
      this.favoritesArtists.splice(favoriteArtistIndex, 1);
    }

    return dbResponse;
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
