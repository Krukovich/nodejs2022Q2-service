import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModel } from './modules/users/users.model';

@Module({
  imports: [UsersModel],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
