import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { uuidValidateV4 } from '../../../utils';
import { EXCEPTION } from '../../../constants';
import { ArtistsService } from './artists.service';
import { IArtist } from './artists.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ChangeArtistDto } from './dto/change-artist.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('artist')
export class ArtistsController {
  private readonly logger: Logger = new Logger(ArtistsController.name);

  constructor(private readonly artistService: ArtistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getAllArtist(): Promise<IArtist[]> {
    return this.artistService.getAllArtist();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getArtistById(@Param('id') id: IArtist['id']): Promise<IArtist> {
    if (!uuidValidateV4(id)) {
      this.logger.warn(EXCEPTION.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist: IArtist = await this.artistService.getArtistById(id);

    if (!artist) {
      this.logger.warn(EXCEPTION.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createArtist(
    @Body(new ValidationPipe()) createArtist: CreateArtistDto,
  ): Promise<IArtist> {
    return await this.artistService.createArtist(createArtist);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async changeArtist(
    @Param('id') id: IArtist['id'],
    @Body(new ValidationPipe()) changeArtis: ChangeArtistDto,
  ): Promise<IArtist> {
    if (!uuidValidateV4(id)) {
      this.logger.warn(EXCEPTION.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist: IArtist = await this.artistService.getArtistById(id);

    if (!artist) {
      this.logger.warn(EXCEPTION.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.artistService.changeArtist(id, changeArtis);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async deleteArtist(@Param('id') id: IArtist['id']): Promise<void> {
    if (!uuidValidateV4(id)) {
      this.logger.warn(EXCEPTION.BAD_REQUEST.BAD_UUID);
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist: IArtist = await this.artistService.getArtistById(id);

    if (!artist) {
      this.logger.warn(EXCEPTION.BAD_REQUEST.NOT_FOUND);
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.artistService.deleteArtist(id);
    }
  }
}
