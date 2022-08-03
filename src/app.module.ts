import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from '../common/logger.middleware';
import { UsersController } from './modules/users/users.controller';
import { TracksController } from './modules/tracks/tracks.controller';
import { AlbumsController } from './modules/albums/albums.controller';
import { ArtistsController } from './modules/artists/artists.controller';
import { FavoritesController } from './modules/favorites/favorites.controller';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        AlbumsController,
        ArtistsController,
        FavoritesController,
        TracksController,
        UsersController,
      );
  }
}
