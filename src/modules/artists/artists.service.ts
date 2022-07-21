import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IArtist } from './artists.interface';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllArtist(): Promise<IArtist[]> {
    return this.prismaService.artists.findMany();
  }

  async getArtistById(id: IArtist['id']): Promise<IArtist> {
    return this.prismaService.artists.findUnique({
      where: { id },
    });
  }

  async createArtist(artist: {
    name: IArtist['name'];
    grammy: IArtist['grammy'];
  }): Promise<IArtist> {
    return await this.prismaService.artists.create({
      data: {
        id: uuidv4(),
        name: artist.name,
        grammy: artist.grammy,
      },
    });
  }

  async changeArtist(
    id: IArtist['id'],
    data: {
      name: IArtist['name'];
      grammy: IArtist['grammy'];
    },
  ): Promise<IArtist> {
    return await this.prismaService.artists.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        grammy: data.grammy,
      },
    });
  }

  async deleteArtist(id: IArtist['id']): Promise<void> {
    await this.prismaService.artists.delete({
      where: {
        id: id,
      },
    });
  }
}
