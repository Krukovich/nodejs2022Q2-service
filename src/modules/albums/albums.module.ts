import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from '../tracks/track.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, FavoritesService, TrackService],
})
export class AlbumsModule {}
