import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import * as fs from 'node:fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('secrets/t-self-signed-private.key'),
    cert: fs.readFileSync('secrets/t-self-signed-public.pem'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    logger: new ConsoleLogger(),
  });

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
