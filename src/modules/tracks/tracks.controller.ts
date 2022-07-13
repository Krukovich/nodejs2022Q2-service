import { TrackService } from './track.service';
import { ITrack } from './tracks.interface';
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
import { CreateTrackDto } from './dto/create-track.dto';
import { ChangeTrackDto } from './dto/change-track.dto';
import { FavoritesService } from '../favorites/favorites.service';

@Controller('track')
export class TracksController {
  constructor(
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllTracks(): ITrack[] {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getTrackById(@Param('id') id: ITrack['id']): ITrack {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }
    const track: ITrack = this.trackService.getTrackById(id);

    if (!track) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Body(new ValidationPipe()) createTrack: CreateTrackDto): ITrack {
    return this.trackService.createTrack(createTrack);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  changeTrack(
    @Param('id') id: ITrack['id'],
    @Body(new ValidationPipe()) changeTrack: ChangeTrackDto,
  ): ITrack {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const track: ITrack = this.trackService.getTrackById(id);

    if (!track) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.trackService.changeTrack(id, changeTrack);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: ITrack['id']) {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const track: ITrack = this.trackService.getTrackById(id);

    if (!track) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    } else {
      this.trackService.deleteTrack(id);
      this.favoritesService.deleteFavoriteTrack(id);
    }
  }
}
