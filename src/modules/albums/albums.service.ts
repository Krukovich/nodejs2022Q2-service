import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IAlbums } from './albums.interface';

@Injectable()
export class AlbumsService {
  private albums: IAlbums[] = [];
  constructor() {
    this.albums = [];
  }

  getAllAlbums(): IAlbums[] {
    return this.albums;
  }

  getAlbumById(id: IAlbums['id']): IAlbums {
    return this.albums.find((user) => user.id === id);
  }

  createAlbum(album: {
    name: IAlbums['name'];
    year: IAlbums['year'];
    artistId: IAlbums['artistId'];
  }) {
    const newAlbum: IAlbums = {
      id: uuidv4(),
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }

  changeAlbum(
    id: IAlbums['id'],
    data: {
      name: IAlbums['name'];
      year: IAlbums['year'];
      artistId: IAlbums['artistId'];
    },
  ) {
    let findIndex: number;
    this.albums.forEach((track: IAlbums, index: number): void => {
      if (id === track.id) {
        track.name = data.name ? data.name : track.name;
        track.year = data.artistId ? data.year : track.year;
        track.artistId = data.artistId ? data.artistId : track.artistId;
        findIndex = index;
      }
    });

    return this.albums[findIndex];
  }

  deleteAlbum(id: IAlbums['id']): void {
    this.albums = this.albums.filter((album: IAlbums) => album.id !== id);
  }
}
