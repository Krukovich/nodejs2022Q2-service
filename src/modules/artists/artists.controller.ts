import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { checkBearerToken, uuidValidateV4 } from '../../../utils';
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
  async getAllArtist(
    @Headers('Authorization') authorization = '',
  ): Promise<IArtist[]> {
    checkBearerToken(authorization);

    return this.artistService.getAllArtist();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getArtistById(
    @Param('id') id: IArtist['id'],
    @Headers('Authorization') authorization = '',
  ): Promise<IArtist> {
    checkBearerToken(authorization);

    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist: IArtist = await this.artistService.getArtistById(id);

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
  async createArtist(
    @Body(new ValidationPipe()) createArtist: CreateArtistDto,
    @Headers('Authorization') authorization = '',
  ): Promise<IArtist> {
    checkBearerToken(authorization);

    return await this.artistService.createArtist(createArtist);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async changeArtist(
    @Param('id') id: IArtist['id'],
    @Body(new ValidationPipe()) changeArtis: ChangeArtistDto,
    @Headers('Authorization') authorization = '',
  ): Promise<IArtist> {
    checkBearerToken(authorization);

    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist: IArtist = await this.artistService.getArtistById(id);

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
  async deleteArtist(
    @Param('id') id: IArtist['id'],
    @Headers('Authorization') authorization = '',
  ): Promise<void> {
    checkBearerToken(authorization);

    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist: IArtist = await this.artistService.getArtistById(id);

    if (!artist) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.artistService.deleteArtist(id);
    }
  }
}
