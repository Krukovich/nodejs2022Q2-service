import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IFavoritesResponse } from './favorites.interface';
import { FavoritesService } from './favorites.service';
import { ITrack } from '../tracks/tracks.interface';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { IAlbum } from '../albums/albums.interface';
import { IArtist } from '../artists/artists.interface';
import { uuidValidateV4 } from '../../../utils';
import { EXCEPTION } from '../../../constants';
import { AuthGuard } from '../auth/auth.guard';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getAllFavorites(): Promise<IFavoritesResponse[]> {
    return await this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createFavoritesTrack(@Param('id') id: ITrack['id']): Promise<ITrack> {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const track: ITrack = await this.trackService.getTrackById(id);

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
  @UseGuards(AuthGuard)
  async deleteFavoriteTrack(@Param('id') id: ITrack['id']): Promise<void> {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const track: ITrack = await this.trackService.getTrackById(id);

    if (!track) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.favoritesService.deleteFavoriteTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createFavoritesAlbum(@Param('id') id: IAlbum['id']): Promise<IAlbum> {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const album: IAlbum = await this.albumsService.getAlbumById(id);

    if (!album) {
      throw new HttpException(
        EXCEPTION.UNPROCESSABLE_ENTITY.NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.favoritesService.createFavoritesAlbum(album);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async deleteFavoritesAlbum(@Param('id') id: IAlbum['id']): Promise<void> {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const album: IAlbum = await this.albumsService.getAlbumById(id);

    if (!album) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.favoritesService.deleteFavoriteAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createFavoritesArtist(
    @Param('id') id: IArtist['id'],
  ): Promise<IArtist> {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist: IArtist = await this.artistsService.getArtistById(id);

    if (!artist) {
      throw new HttpException(
        EXCEPTION.UNPROCESSABLE_ENTITY.NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.favoritesService.createFavoritesArtist(artist);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async deleteFavoritesArtist(@Param('id') id: IArtist['id']): Promise<void> {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist: IArtist = await this.artistsService.getArtistById(id);

    if (!artist) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.favoritesService.deleteFavoriteArtist(id);
  }
}
