import { Injectable } from '@nestjs/common';
import { ITrack } from '../tracks/tracks.interface';
import { IAlbum } from '../albums/albums.interface';
import { IArtist } from '../artists/artists.interface';
import { PrismaClient } from '@prisma/client';
import { prepareResult } from '../../../utils';
const prisma = new PrismaClient();

@Injectable()
export class FavoritesService {
  async getAllFavorites(): Promise<any> {
    const favorites = await prisma.favorite.findMany({
      select: {
        artists: { select: { id: true, name: true, grammy: true } },
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });

    return prepareResult(favorites);
  }

  async createFavoritesTrack(track: ITrack): Promise<ITrack> {
    const favorites = await prisma.favorite.findMany();

    if (!favorites.length) {
      const newFavorites = await prisma.favorite.create({ data: {} });
      await prisma.track.update({
        where: { id: track.id },
        data: { favoriteId: newFavorites.id },
      });
    } else {
      await prisma.track.update({
        where: { id: track.id },
        data: { favoriteId: favorites[0].id },
      });
    }

    return track;
  }

  async deleteFavoriteTrack(id: ITrack['id']): Promise<void> {
    await prisma.track.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }

  async createFavoritesAlbum(album: IAlbum): Promise<IAlbum> {
    const favorites = await prisma.favorite.findMany();

    if (!favorites.length) {
      const newFavorites = await prisma.favorite.create({ data: {} });
      await prisma.album.update({
        where: { id: album.id },
        data: { favoriteId: newFavorites.id },
      });
    } else {
      await prisma.album.update({
        where: { id: album.id },
        data: { favoriteId: favorites[0].id },
      });
    }

    return album;
  }

  async deleteFavoriteAlbum(id: IAlbum['id']): Promise<void> {
    await prisma.album.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }

  async createFavoritesArtist(artist: IArtist): Promise<IArtist> {
    const favorites = await prisma.favorite.findMany();

    if (!favorites.length) {
      const newFavorites = await prisma.favorite.create({ data: {} });
      await prisma.artist.update({
        where: { id: artist.id },
        data: { favoriteId: newFavorites.id },
      });
    } else {
      await prisma.artist.update({
        where: { id: artist.id },
        data: { favoriteId: favorites[0].id },
      });
    }

    return artist;
  }

  async deleteFavoriteArtist(id: IArtist['id']): Promise<void> {
    await prisma.artist.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }
}
