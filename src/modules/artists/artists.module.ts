import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, FavoritesService, TracksService, AlbumsService],
})
export class ArtistsModule {}
