import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

async function bootstrap() {
  let options = {};
  if (process.env.ENV === 'prod') {
    const httpsOptions = {
      key: fs.readFileSync(
        path.join(process.cwd(), 'secrets/t-self-signed-private.key'),
      ),
      cert: fs.readFileSync(
        path.join(process.cwd(), 'secrets/t-self-signed-public.pem'),
      ),
    };
    options = {
      httpsOptions,
      logger: new ConsoleLogger(),
    };
  } else {
    options = {
      logger: new ConsoleLogger(),
    };
  }

  const app = await NestFactory.create(AppModule, options);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
