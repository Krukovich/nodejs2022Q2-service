import { TracksService } from './tracks.service';
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
  UseGuards,
  Logger,
} from '@nestjs/common';
import { uuidValidateV4 } from '../../../utils';
import { EXCEPTION } from '../../../constants';
import { CreateTrackDto } from './dto/create-track.dto';
import { ChangeTrackDto } from './dto/change-track.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('track')
export class TracksController {
  private readonly logger: Logger = new Logger(TracksController.name);

  constructor(private readonly trackService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getAllTracks(): Promise<ITrack[]> {
    return await this.trackService.getAllTracks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getTrackById(@Param('id') id: ITrack['id']): Promise<ITrack> {
    if (!uuidValidateV4(id)) {
      this.logger.warn(EXCEPTION.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }
    const track: ITrack = await this.trackService.getTrackById(id);

    if (!track) {
      this.logger.warn(EXCEPTION.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createTrack(
    @Body(new ValidationPipe()) createTrack: CreateTrackDto,
  ): Promise<ITrack> {
    return await this.trackService.createTrack(createTrack);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async changeTrack(
    @Param('id') id: ITrack['id'],
    @Body(new ValidationPipe()) changeTrack: ChangeTrackDto,
  ): Promise<ITrack> {
    if (!uuidValidateV4(id)) {
      this.logger.warn(EXCEPTION.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const track: ITrack = await this.trackService.getTrackById(id);

    if (!track) {
      this.logger.warn(EXCEPTION.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.trackService.changeTrack(id, changeTrack);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async deleteTrack(@Param('id') id: ITrack['id']): Promise<void> {
    if (!uuidValidateV4(id)) {
      this.logger.warn(EXCEPTION.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const track: ITrack = await this.trackService.getTrackById(id);

    if (!track) {
      this.logger.warn(EXCEPTION.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.trackService.deleteTrack(id);
    }
  }
}
