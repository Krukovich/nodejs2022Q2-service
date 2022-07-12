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
import { IAlbums } from './albums.interface';
import { uuidValidateV4 } from '../../../utils';
import { EXCEPTION } from '../../../constants';
import { CreateAlbumsDto } from './dto/create-albums.dto';
import { ChangeAlbumsDto } from './dto/change-albums.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllAlbums(): IAlbums[] {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getAlbumById(@Param('id') id: IAlbums['id']): IAlbums {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }
    const album: IAlbums = this.albumsService.getAlbumById(id);

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
  createAlbum(
    @Body(new ValidationPipe()) createAlbum: CreateAlbumsDto,
  ): IAlbums {
    return this.albumsService.createAlbum(createAlbum);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  changeAlbum(
    @Param('id') id: IAlbums['id'],
    @Body(new ValidationPipe()) changeAlbums: ChangeAlbumsDto,
  ): IAlbums {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const album: IAlbums = this.albumsService.getAlbumById(id);

    if (!album) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.albumsService.changeAlbum(id, changeAlbums);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: IAlbums['id']) {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const album: IAlbums = this.albumsService.getAlbumById(id);

    if (!album) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    } else {
      this.albumsService.deleteAlbum(id);
    }
  }
}
