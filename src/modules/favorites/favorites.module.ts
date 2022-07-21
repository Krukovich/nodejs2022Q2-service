import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [
    FavoritesService,
    AlbumsService,
    TracksService,
    ArtistsService,
    PrismaService,
  ],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
