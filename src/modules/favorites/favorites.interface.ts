import { IArtist } from '../artists/artists.interface';
import { IAlbum } from '../albums/albums.interface';
import { ITrack } from '../tracks/tracks.interface';

export interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

export enum ISearchFavorite {
  'artists',
  'albums',
  'tracks',
}
