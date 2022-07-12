import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IArtist } from './artists.interface';

@Injectable()
export class ArtistsService {
  private artists: IArtist[] = [];
  constructor() {
    this.artists = [];
  }

  getAllArtist(): IArtist[] {
    return this.artists;
  }

  getArtistById(id: IArtist['id']): IArtist {
    return this.artists.find((user) => user.id === id);
  }

  createArtist(artist: IArtist) {
    const newArtis: IArtist = {
      id: uuidv4(),
      name: artist.name,
      grammy: artist.grammy,
    };

    this.artists.push(newArtis);

    return newArtis;
  }

  changeArtist(
    id: IArtist['id'],
    data: {
      name: IArtist['name'];
      grammy: IArtist['grammy'];
    },
  ) {
    let findIndex: number;
    this.artists.forEach((artist: IArtist, index: number): void => {
      if (id === artist.id) {
        artist.name = data.name ? data.name : artist.name;
        artist.grammy = data.grammy ? data.grammy : artist.grammy;

        findIndex = index;
      }
    });

    return this.artists[findIndex];
  }

  deleteArtist(id: IArtist['id']): void {
    this.artists = this.artists.filter((artist: IArtist) => artist.id !== id);
  }
}
