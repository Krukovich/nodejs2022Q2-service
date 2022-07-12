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
import { uuidValidateV4 } from '../../../utils';
import { EXCEPTION } from '../../../constants';
import { ArtistsService } from './artists.service';
import { IArtist } from './artists.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ChangeArtistDto } from './dto/change-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllArtist(): IArtist[] {
    return this.artistService.getAllArtist();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getArtistById(@Param('id') id: IArtist['id']): IArtist {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist: IArtist = this.artistService.getArtistById(id);

    if (!artist) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createArtist(
    @Body(new ValidationPipe()) createArtist: CreateArtistDto,
  ): IArtist {
    return this.artistService.createArtist(createArtist);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  changeArtist(
    @Param('id') id: IArtist['id'],
    @Body(new ValidationPipe()) changeArtis: ChangeArtistDto,
  ): IArtist {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist: IArtist = this.artistService.getArtistById(id);

    if (!artist) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.artistService.changeArtist(id, changeArtis);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: IArtist['id']) {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist: IArtist = this.artistService.getArtistById(id);

    if (!artist) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    } else {
      this.artistService.deleteArtist(id);
    }
  }
}
