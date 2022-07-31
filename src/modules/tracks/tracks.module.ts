import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TrackService } from './track.service';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  controllers: [TracksController],
  providers: [TrackService, FavoritesService],
})
export class TracksModule {}
