import { IArtist } from '../artists/artists.interface';
import { IAlbum } from '../albums/albums.interface';
import { ITrack } from '../tracks/tracks.interface';

export interface IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface IFavoritesRepsonse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
