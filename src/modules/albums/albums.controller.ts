import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { IAlbum } from './albums.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ChangeAlbumDto } from './dto/change-album.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { IArtist } from '../artists/artists.interface';
import { ArtistsService } from '../artists/artists.service';
import { uuidValidateV4 } from '../../../utils';
import { EXCEPTION } from '../../../constants';

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TracksService,
    private readonly artistService: ArtistsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllAlbums(): Promise<IAlbum[]> {
    return await this.albumsService.getAllAlbums();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getAlbumById(@Param('id') id: IAlbum['id']): Promise<IAlbum> {
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

    return album;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(
    @Body(new ValidationPipe()) createAlbum: CreateAlbumDto,
  ): Promise<IAlbum> {
    return await this.albumsService.createAlbum(createAlbum);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async changeAlbum(
    @Param('id') id: IAlbum['id'],
    @Body(new ValidationPipe()) changeAlbums: ChangeAlbumDto,
  ): Promise<IAlbum> {
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

    const artis: IArtist = await this.artistService.getArtistById(
      changeAlbums.artistId,
    );

    if (!artis) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.albumsService.changeAlbum(id, changeAlbums);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') id: IAlbum['id']): Promise<void> {
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
    } else {
      await this.albumsService.deleteAlbum(id);
      await this.trackService.setAlbumIdIsNull(id);
      this.favoritesService.deleteFavoriteAlbum(id);
    }
  }
}
