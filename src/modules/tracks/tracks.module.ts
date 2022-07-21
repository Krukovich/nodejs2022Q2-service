import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, FavoritesService, PrismaService],
})
export class TracksModule {}
