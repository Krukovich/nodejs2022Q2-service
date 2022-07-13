import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IAlbum } from './albums.interface';

@Injectable()
export class AlbumsService {
  private albums: IAlbum[] = [];
  constructor() {
    this.albums = [];
  }

  getAllAlbums(): IAlbum[] {
    return this.albums;
  }

  getAlbumById(id: IAlbum['id']): IAlbum {
    return this.albums.find((user) => user.id === id);
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

    this.albums.push(newAlbum);

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
    this.albums.forEach((track: IAlbum, index: number): void => {
      if (id === track.id) {
        track.name = data.name ? data.name : track.name;
        track.year = data.artistId ? data.year : track.year;
        track.artistId = data.artistId ? data.artistId : track.artistId;
        findIndex = index;
      }
    });

    return this.albums[findIndex];
  }

  deleteAlbum(id: IAlbum['id']): void {
    this.albums = this.albums.filter((album: IAlbum) => album.id !== id);
  }
}
