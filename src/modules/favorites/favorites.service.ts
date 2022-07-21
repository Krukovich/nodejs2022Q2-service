import { Injectable } from '@nestjs/common';
import { IFavoritesResponse, ISearchFavorite } from './favorites.interface';
import { ITrack } from '../tracks/tracks.interface';
import { IAlbum } from '../albums/albums.interface';
import { IArtist } from '../artists/artists.interface';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  private static favorites: IFavoritesResponse;
  constructor(private readonly prismaService: PrismaService) {
    FavoritesService.favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  async getAllFavorites(): Promise<any> {
    return await this.prismaService.favorite.findMany({
      select: {
        tracks: { where: { NOT: [{ favoriteId: null }] } },
        albums: { where: { NOT: [{ favoriteId: null }] } },
        artists: { where: { NOT: [{ favoriteId: null }] } },
      },
    });
  }

  async createFavoritesTrack(track: ITrack): Promise<ITrack> {
    const { id } = await this.prismaService.favorite.create({ data: {} });
    await this.prismaService.track.update({
      where: {
        id: track.id,
      },
      data: {
        favoriteId: id,
      },
    });
    return track;
  }

  async deleteFavoriteTrack(id: ITrack['id']): Promise<void> {
    await this.prismaService.favorite.delete({
      where: {
        id: id,
      },
    });
  }

  createFavoritesAlbum(album: IAlbum): IAlbum {
    FavoritesService.favorites.albums.push(album);
    return album;
  }

  deleteFavoriteAlbum(id: IAlbum['id']): void {
    FavoritesService.favorites.albums =
      FavoritesService.favorites.albums.filter(
        (album: IAlbum) => album.id !== id,
      );
    FavoritesService.favorites.tracks = FavoritesService.favorites.tracks.map(
      (track: ITrack) => {
        return {
          ...track,
          albumId: track.albumId === id ? null : track.albumId,
        };
      },
    );
  }

  createFavoritesArtist(artist: IArtist): IArtist {
    FavoritesService.favorites.artists.push(artist);
    return artist;
  }

  deleteFavoriteArtist(id: IArtist['id']): void {
    FavoritesService.favorites.artists =
      FavoritesService.favorites.artists.filter(
        (artist: IArtist) => artist.id !== id,
      );
    FavoritesService.favorites.tracks = FavoritesService.favorites.tracks.map(
      (track: ITrack) => {
        return {
          ...track,
          artistId: track.artistId === id ? null : track.artistId,
        };
      },
    );
    FavoritesService.favorites.albums = FavoritesService.favorites.albums.map(
      (album: IAlbum) => {
        return {
          ...album,
          artistId: album.artistId === id ? null : album.artistId,
        };
      },
    );
  }

  searchInFavorites(
    favorite: ISearchFavorite,
    id: IArtist['id'] | IAlbum['id'] | ITrack['id'],
  ): boolean {
    return !!(
      FavoritesService.favorites[favorite] as Array<IArtist | IAlbum | ITrack>
    ).find((fav: IArtist | IAlbum | ITrack) => fav.id === id);
  }
}
