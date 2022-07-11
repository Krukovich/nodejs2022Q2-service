import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TracksModule } from './modules/Tracks/tracks.module';

@Module({
  imports: [UsersModule, TracksModule],
})
export class AppModule {}
