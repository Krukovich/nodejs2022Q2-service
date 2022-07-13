import { Injectable } from '@nestjs/common';
import { IFavoritesResponse } from './favorites.interface';
import { ITrack } from '../tracks/tracks.interface';
import { IAlbum } from '../albums/albums.interface';
import { IArtist } from '../artists/artists.interface';

@Injectable()
export class FavoritesService {
  private static favorites: IFavoritesResponse;
  constructor() {
    FavoritesService.favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  getAllFavorites(): IFavoritesResponse {
    return FavoritesService.favorites;
  }

  createFavoritesTrack(track: ITrack): void {
    FavoritesService.favorites.tracks.push(track);
  }

  deleteFavoriteTrack(id: ITrack['id']): void {
    FavoritesService.favorites.tracks =
      FavoritesService.favorites.tracks.filter(
        (track: ITrack) => track.id !== id,
      );
  }

  createFavoritesAlbum(album: IAlbum): void {
    FavoritesService.favorites.albums.push(album);
  }

  deleteFavoriteAlbum(id: IAlbum['id']): void {
    FavoritesService.favorites.albums =
      FavoritesService.favorites.albums.filter(
        (album: IAlbum) => album.id !== id,
      );
  }

  createFavoritesArtist(artist: IArtist): void {
    FavoritesService.favorites.artists.push(artist);
  }

  deleteFavoriteArtist(id: IArtist['id']): void {
    FavoritesService.favorites.artists =
      FavoritesService.favorites.artists.filter(
        (artist: IArtist) => artist.id !== id,
      );
  }
}
