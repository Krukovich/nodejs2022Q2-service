import { Injectable } from '@nestjs/common';
import { IFavoritesResponse, ISearchFavorite } from './favorites.interface';
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

  createFavoritesTrack(track: ITrack): ITrack {
    FavoritesService.favorites.tracks.push(track);
    return track;
  }

  deleteFavoriteTrack(id: ITrack['id']): void {
    FavoritesService.favorites.tracks =
      FavoritesService.favorites.tracks.filter(
        (track: ITrack) => track.id !== id,
      );
  }

  createFavoritesAlbum(album: IAlbum): IAlbum {
    FavoritesService.favorites.albums.push(album);
    return album;
  }

  deleteFavoriteAlbum(id: IAlbum['id']): void {
    FavoritesService.favorites.albums =
      FavoritesService.favorites.albums.filter(
        (album: IAlbum) => album.id !== id,
      );
    FavoritesService.favorites.tracks = FavoritesService.favorites.tracks.map(
      (track: ITrack) => {
        return {
          ...track,
          albumId: track.albumId === id ? null : track.albumId,
        };
      },
    );
  }

  createFavoritesArtist(artist: IArtist): IArtist {
    FavoritesService.favorites.artists.push(artist);
    return artist;
  }

  deleteFavoriteArtist(id: IArtist['id']): void {
    FavoritesService.favorites.artists =
      FavoritesService.favorites.artists.filter(
        (artist: IArtist) => artist.id !== id,
      );
    FavoritesService.favorites.tracks = FavoritesService.favorites.tracks.map(
      (track: ITrack) => {
        return {
          ...track,
          artistId: track.artistId === id ? null : track.artistId,
        };
      },
    );
    FavoritesService.favorites.albums = FavoritesService.favorites.albums.map(
      (album: IAlbum) => {
        return {
          ...album,
          artistId: album.artistId === id ? null : album.artistId,
        };
      },
    );
  }

  searchInFavorites(
    favorite: ISearchFavorite,
    id: IArtist['id'] | IAlbum['id'] | ITrack['id'],
  ): boolean {
    return !!(
      FavoritesService.favorites[favorite] as Array<IArtist | IAlbum | ITrack>
    ).find((fav: IArtist | IAlbum | ITrack) => fav.id === id);
  }
}
