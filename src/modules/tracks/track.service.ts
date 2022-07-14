import { Injectable } from '@nestjs/common';
import { ITrack } from './tracks.interface';
import { v4 as uuidv4 } from 'uuid';
import { IArtist } from '../artists/artists.interface';
import { IAlbum } from '../albums/albums.interface';

@Injectable()
export class TrackService {
  private static tracks: ITrack[] = [];

  constructor() {
    TrackService.tracks = [];
  }

  getAllTracks(): ITrack[] {
    return TrackService.tracks;
  }

  getTrackById(id: ITrack['id']): ITrack {
    return TrackService.tracks.find((track: ITrack) => track.id === id);
  }

  createTrack(track: {
    name: ITrack['name'];
    albumId: ITrack['albumId'];
    artistId: ITrack['artistId'];
    duration: ITrack['duration'];
  }) {
    const newTrack: ITrack = {
      id: uuidv4(),
      name: track.name,
      albumId: track.albumId ? track.albumId : null,
      artistId: track.artistId ? track.artistId : null,
      duration: track.duration,
    };

    TrackService.tracks.push(newTrack);

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
    TrackService.tracks.forEach((track: ITrack, index: number): void => {
      if (id === track.id) {
        track.name = data.name ? data.name : track.name;
        track.duration = data.duration ? data.duration : track.duration;
        track.albumId = data.albumId ? data.albumId : track.albumId;
        track.artistId = data.artistId ? data.artistId : track.artistId;

        findIndex = index;
      }
    });

    return TrackService.tracks[findIndex];
  }

  deleteTrack(id: ITrack['id']): void {
    TrackService.tracks = TrackService.tracks.filter(
      (track: ITrack) => track.id !== id,
    );
  }

  setArtistIdIsNull(id: IArtist['id']): void {
    TrackService.tracks = TrackService.tracks.map((track: ITrack) => {
      return {
        ...track,
        artistId: track.artistId === id ? null : track.artistId,
      };
    });
  }

  setAlbumIdIsNull(id: IAlbum['id']): void {
    TrackService.tracks = TrackService.tracks.map((track: ITrack) => {
      return {
        ...track,
        albumId: track.albumId === id ? null : track.albumId,
      };
    });
  }
}
