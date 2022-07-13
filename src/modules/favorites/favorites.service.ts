import { Injectable } from '@nestjs/common';
import { IFavoritesResponse, ISearchFavorite } from './favorites.interface';
import { ITrack } from '../tracks/tracks.interface';
import { IAlbum } from '../albums/albums.interface';
import { IArtist } from '../artists/artists.interface';

@Injectable()
export class FavoritesService {
  private readonly favorites: IFavoritesResponse;
  constructor() {
    this.favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  getAllFavorites(): IFavoritesResponse {
    return this.favorites;
  }

  createFavoritesTrack(track: ITrack): void {
    this.favorites.tracks.push(track);
  }

  deleteFavoriteTrack(id: ITrack['id']): void {
    this.favorites.tracks = this.favorites.tracks.filter(
      (track: ITrack) => track.id !== id,
    );
  }

  createFavoritesAlbum(album: IAlbum): void {
    this.favorites.albums.push(album);
  }

  deleteFavoriteAlbum(id: IAlbum['id']): void {
    this.favorites.albums = this.favorites.albums.filter(
      (album: IAlbum) => album.id !== id,
    );
  }

  createFavoritesArtist(artist: IArtist): void {
    this.favorites.artists.push(artist);
  }

  deleteFavoriteArtist(id: IArtist['id']): void {
    this.favorites.artists = this.favorites.artists.filter(
      (artist: IArtist) => artist.id !== id,
    );
  }

  searchFavorite(
    favorite: ISearchFavorite,
    id: IArtist['id'] | IAlbum['id'] | ITrack['id'],
  ): boolean {
    return this.favorites[favorite].find((fav) => fav.id === id);
  }
}
