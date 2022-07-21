import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from '../tracks/track.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ArtistsService } from '../artists/artists.service';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    FavoritesService,
    TrackService,
    PrismaService,
    ArtistsService,
  ],
})
export class AlbumsModule {}
