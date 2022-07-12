import { Injectable } from '@nestjs/common';
import { ITrack } from './tracks.interface';
import { IUser } from '../users/users.interface';

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

  createTrack(track) {}

  changeTrack(id: IUser['id'], data) {}

  deleteTrack(id: ITrack['id']): ITrack[] {
    return (this.tracks = this.tracks.filter(
      (track: ITrack) => track.id !== id,
    ));
  }
}
