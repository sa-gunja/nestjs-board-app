import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from '../node_modules/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const serverConfig = config.get('server');
  // const port = serverConfig.port;
  const serverConfig = config.get('server');
  const port = serverConfig.port;

  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
