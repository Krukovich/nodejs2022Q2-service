import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IArtist } from './artists.interface';

@Injectable()
export class ArtistsService {
  private static artists: IArtist[] = [];

  constructor() {
    ArtistsService.artists = [];
  }

  getAllArtist(): IArtist[] {
    return ArtistsService.artists;
  }

  getArtistById(id: IArtist['id']): IArtist {
    return ArtistsService.artists.find((user) => user.id === id);
  }

  createArtist(artist: { name: IArtist['name']; grammy: IArtist['grammy'] }) {
    const newArtis: IArtist = {
      id: uuidv4(),
      name: artist.name,
      grammy: artist.grammy,
    };

    ArtistsService.artists.push(newArtis);

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
    ArtistsService.artists.forEach((artist: IArtist, index: number): void => {
      if (id === artist.id) {
        artist.name = data.name ? data.name : artist.name;
        artist.grammy = data.grammy ? data.grammy : artist.grammy;

        findIndex = index;
      }
    });

    return ArtistsService.artists[findIndex];
  }

  deleteArtist(id: IArtist['id']): void {
    ArtistsService.artists = ArtistsService.artists.filter(
      (artist: IArtist) => artist.id !== id,
    );
  }
}
