import { Injectable } from '@nestjs/common';
import { ITrack } from './tracks.interface';
import { v4 as uuidv4 } from 'uuid';
import { IArtist } from '../artists/artists.interface';
import { IAlbum } from '../albums/albums.interface';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllTracks(): Promise<ITrack[]> {
    return this.prismaService.track.findMany();
  }

  async getTrackById(id: ITrack['id']): Promise<ITrack> {
    return await this.prismaService.track.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createTrack(track: {
    name: ITrack['name'];
    albumId: ITrack['albumId'];
    artistId: ITrack['artistId'];
    duration: ITrack['duration'];
  }) {
    return await this.prismaService.track.create({
      data: {
        id: uuidv4(),
        name: track.name ? track.name : null,
        albumId: track.albumId ? track.albumId : null,
        artistId: track.artistId ? track.artistId : null,
        duration: track.duration ? track.duration : null,
      },
    });
  }

  async changeTrack(
    id: ITrack['id'],
    data: {
      name: ITrack['name'];
      duration: ITrack['duration'];
      albumId: ITrack['albumId'];
      artistId: ITrack['artistId'];
    },
  ): Promise<ITrack> {
    return await this.prismaService.track.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        duration: data.duration,
        albumId: data.albumId,
        artistId: data.artistId,
      },
    });
  }

  async deleteTrack(id: ITrack['id']): Promise<void> {
    await this.prismaService.track.delete({
      where: {
        id: id,
      },
    });
  }

  async setArtistIdIsNull(id: IArtist['id']): Promise<void> {
    await this.prismaService.track.update({
      where: {
        id: id,
      },
      data: {
        artistId: null,
      },
    });
  }

  async setAlbumIdIsNull(id: IAlbum['id']): Promise<void> {
    await this.prismaService.track.update({
      where: {
        id: id,
      },
      data: {
        albumId: null,
      },
    });
  }
}
