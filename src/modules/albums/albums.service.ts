import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IAlbum } from './albums.interface';
import { IArtist } from '../artists/artists.interface';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllAlbums(): Promise<IAlbum[]> {
    return this.prismaService.albums.findMany();
  }

  async getAlbumById(id: IAlbum['id']): Promise<IAlbum> {
    return this.prismaService.albums.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createAlbum(album: {
    name: IAlbum['name'];
    year: IAlbum['year'];
    artistId: IAlbum['artistId'];
  }): Promise<IAlbum> {
    return await this.prismaService.albums.create({
      data: {
        id: uuidv4(),
        name: album.name,
        year: album.year,
        artistId: album.artistId ? album.artistId : null,
      },
    });
  }

  async changeAlbum(
    id: IAlbum['id'],
    data: {
      name: IAlbum['name'];
      year: IAlbum['year'];
      artistId: IAlbum['artistId'];
    },
  ) {
    return await this.prismaService.albums.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        year: data.year,
        artistId: data.artistId,
      },
    });
  }

  async deleteAlbum(id: IAlbum['id']): Promise<void> {
    await this.prismaService.albums.delete({
      where: {
        id: id,
      },
    });
  }

  async setArtistIdIsNull(id: IArtist['id']): Promise<void> {
    await this.prismaService.albums.update({
      where: {
        id: id,
      },
      data: {
        artistId: null,
      },
    });
  }
}
