import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { join } from 'path';
import { ApplicationLogger } from '../common/loggerService.service';
import { addException, prepareLoggerVariables } from '../utils';

const PORT: string | number = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ApplicationLogger(prepareLoggerVariables()),
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  addException();
  const rootDirname = process.cwd();
  const DOC_API = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);

  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
}

bootstrap().then(() => console.log('Have FUN!'));
