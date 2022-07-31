import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IAlbum } from './albums.interface';
import { IArtist } from '../artists/artists.interface';

@Injectable()
export class AlbumsService {
  private static albums: IAlbum[] = [];

  constructor() {
    AlbumsService.albums = [];
  }

  getAllAlbums(): IAlbum[] {
    return AlbumsService.albums;
  }

  getAlbumById(id: IAlbum['id']): IAlbum {
    return AlbumsService.albums.find((user) => user.id === id);
  }

  createAlbum(album: {
    name: IAlbum['name'];
    year: IAlbum['year'];
    artistId: IAlbum['artistId'];
  }) {
    const newAlbum: IAlbum = {
      id: uuidv4(),
      name: album.name,
      year: album.year,
      artistId: album.artistId ? album.artistId : null,
    };

    AlbumsService.albums.push(newAlbum);

    return newAlbum;
  }

  changeAlbum(
    id: IAlbum['id'],
    data: {
      name: IAlbum['name'];
      year: IAlbum['year'];
      artistId: IAlbum['artistId'];
    },
  ) {
    let findIndex: number;
    AlbumsService.albums.forEach((track: IAlbum, index: number): void => {
      if (id === track.id) {
        track.name = data.name ? data.name : track.name;
        track.year = data.artistId ? data.year : track.year;
        track.artistId = data.artistId ? data.artistId : track.artistId;
        findIndex = index;
      }
    });

    return AlbumsService.albums[findIndex];
  }

  deleteAlbum(id: IAlbum['id']): void {
    AlbumsService.albums = AlbumsService.albums.filter(
      (album: IAlbum) => album.id !== id,
    );
  }

  setArtistIdIsNull(id: IArtist['id']): void {
    AlbumsService.albums = AlbumsService.albums.map((album: IAlbum) => {
      return {
        ...album,
        artistId: album.artistId === id ? null : album.artistId,
      };
    });
  }
}
