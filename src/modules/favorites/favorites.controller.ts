import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { IFavoritesResponse, ISearchFavorite } from './favorites.interface';
import { FavoritesService } from './favorites.service';
import { ITrack } from '../tracks/tracks.interface';
import { TrackService } from '../tracks/track.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { IAlbum } from '../albums/albums.interface';
import { IArtist } from '../artists/artists.interface';
import { uuidValidateV4 } from '../../../utils';
import { EXCEPTION } from '../../../constants';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllFavorites(): IFavoritesResponse {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  createFavoritesTrack(@Param('id') id: ITrack['id']) {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const track: ITrack = this.trackService.getTrackById(id);

    if (!track) {
      throw new HttpException(
        EXCEPTION.UNPROCESSABLE_ENTITY.NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.favoritesService.createFavoritesTrack(track);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteTrack(@Param('id') id: ITrack['id']) {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (this.favoritesService.searchFavorite(ISearchFavorite.tracks, id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    this.favoritesService.deleteFavoriteTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  createFavoritesAlbum(@Param('id') id: IAlbum['id']) {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const album: IAlbum = this.albumsService.getAlbumById(id);

    if (!album) {
      throw new HttpException(
        EXCEPTION.UNPROCESSABLE_ENTITY.NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favoritesService.createFavoritesAlbum(album);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoritesAlbum(@Param('id') id: IAlbum['id']) {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (this.favoritesService.searchFavorite(ISearchFavorite.albums, id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    this.favoritesService.deleteFavoriteAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  createFavoritesArtist(@Param('id') id: IArtist['id']) {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist: IArtist = this.artistsService.getArtistById(id);

    if (!artist) {
      throw new HttpException(
        EXCEPTION.UNPROCESSABLE_ENTITY.NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favoritesService.createFavoritesArtist(artist);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoritesArtist(@Param('id') id: IArtist['id']) {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (this.favoritesService.searchFavorite(ISearchFavorite.artists, id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    this.favoritesService.deleteFavoriteArtist(id);
  }
}
