import { HttpStatus, Injectable } from '@nestjs/common';

import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { ServiceResponse } from 'src/libs/service-response';
import { Favorites } from './entities/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async readAll() {
    const serviceResponse = new ServiceResponse<Favorites>();

    const [artists, albums, tracks] = await Promise.all([
      this.artistService.getFavoriteArtists(),
      this.albumService.getFavoriteAlbums(),
      this.trackService.getFavoriteTracks(),
    ]);

    serviceResponse.data = {
      artists,
      albums,
      tracks,
    };

    return serviceResponse;
  }

  async addFavoriteTrack(id: string) {
    const serviceResponse = new ServiceResponse<string>();

    const trackId = await this.trackService.addTrackToFavorites(id);

    if (!trackId) {
      serviceResponse.errorCode = HttpStatus.UNPROCESSABLE_ENTITY;
    }

    if (trackId) {
      serviceResponse.data = trackId;
    }

    return serviceResponse;
  }

  async addFavoriteAlbum(id: string) {
    const serviceResponse = new ServiceResponse<string>();

    const albumId = await this.albumService.addAlbumToFavorites(id);

    if (!albumId) {
      serviceResponse.errorCode = HttpStatus.UNPROCESSABLE_ENTITY;
    }

    if (albumId) {
      serviceResponse.data = albumId;
    }

    return serviceResponse;
  }

  async addFavoriteArtist(id: string) {
    const serviceResponse = new ServiceResponse<string>();

    const artistId = await this.artistService.addArtistToFavorites(id);

    if (!artistId) {
      serviceResponse.errorCode = HttpStatus.UNPROCESSABLE_ENTITY;
    }

    if (artistId) {
      serviceResponse.data = artistId;
    }

    return serviceResponse;
  }

  async deleteFavoriteTrack(id: string) {
    const serviceResponse = new ServiceResponse<string>();

    const trackId = await this.trackService.deleteTrackFromFavorites(id);

    if (!trackId) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    return serviceResponse;
  }

  async deleteFavoriteAlbum(id: string) {
    const serviceResponse = new ServiceResponse<string>();

    const albumId = await this.albumService.deleteAlbumFromFavorites(id);

    if (!albumId) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    return serviceResponse;
  }

  async deleteFavoriteArtist(id: string) {
    const serviceResponse = new ServiceResponse<string>();

    const artistId = await this.artistService.deleteArtistFromFavorites(id);

    if (!artistId) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    return serviceResponse;
  }
}
