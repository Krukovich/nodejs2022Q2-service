import { Injectable } from '@nestjs/common';
import { ITrack } from './tracks.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private tracks: ITrack[] = [];
  constructor() {
    this.tracks = [];
  }

  getAllTracks(): ITrack[] {
    return this.tracks;
  }

  getTrackById(id: ITrack['id']): ITrack {
    return this.tracks.find((user) => user.id === id);
  }

  createTrack(track: ITrack) {
    const newTrack: ITrack = {
      id: uuidv4(),
      name: track.name,
      albumId: track.albumId,
      artistId: track.artistId,
      duration: track.duration,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  changeTrack(
    id: ITrack['id'],
    data: {
      name: ITrack['name'];
      duration: ITrack['duration'];
      albumId: ITrack['albumId'];
      artistId: ITrack['artistId'];
    },
  ) {
    let findIndex: number;
    this.tracks.forEach((track: ITrack, index: number): void => {
      if (id === track.id) {
        track.name = data.name ? data.name : track.name;
        track.duration = data.duration ? data.duration : track.duration;
        track.albumId = data.albumId ? data.albumId : track.albumId;
        track.artistId = data.artistId ? data.artistId : track.artistId;

        findIndex = index;
      }
    });

    return this.tracks[findIndex];
  }

  deleteTrack(id: ITrack['id']): void {
    this.tracks = this.tracks.filter((track: ITrack) => track.id !== id);
  }
}
