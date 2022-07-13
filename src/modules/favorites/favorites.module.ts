import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AlbumsService } from '../albums/albums.service';
import { TrackService } from '../tracks/track.service';
import { ArtistsService } from '../artists/artists.service';

@Module({
  providers: [FavoritesService, AlbumsService, TrackService, ArtistsService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
