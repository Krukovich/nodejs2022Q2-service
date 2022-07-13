import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, FavoritesService],
})
export class AlbumsModule {}
