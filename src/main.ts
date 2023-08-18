import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import bodyParser from 'body-parser';

import { AppModule } from '@/app.module';
import {
  NESTKIT_WINSTON_LOGGER_FACTORY_PROVIDER, AppEnv, HttpExceptionFilter, NESTKIT_WINSTON_SYSTEM_LOGGER_PROVIDER,
} from '@deeepvision/nest-kit';
import { NestExpressApplication } from '@nestjs/platform-express';
import hbs from 'hbs';
import { resolve } from 'path';

hbs.registerPartials(resolve(__dirname, '../src/resources/emails/partials/'));

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useLogger(app.get(NESTKIT_WINSTON_SYSTEM_LOGGER_PROVIDER));
  app.enableCors();

  app.use(bodyParser.json({
    limit: '50mb',
  }));
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  }));

  app.useStaticAssets(resolve(__dirname, '../public'));
  app.setBaseViewsDir(resolve(__dirname, '../src/resources/emails/'));
  app.setViewEngine('hbs');

  const { httpAdapter } = app.get(HttpAdapterHost);
  const loggerFactory = app.get(NESTKIT_WINSTON_LOGGER_FACTORY_PROVIDER);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter, loggerFactory));

  const logger = loggerFactory.create({
    scope: 'Main',
  });

  /**
   * Payloads coming in over the network are plain JavaScript objects.
   * The ValidationPipe can automatically transform payloads to be objects typed according to their DTO classes.
   * To enable auto-transformation, set transform to true
   */
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  await app.listen(process.env.PORT as string);

  logger.info(`Start HTTP server on port ${process.env.PORT}`);

  if (process.env.APP_ENV === AppEnv.LOCAL) {
    logger.info(
      `Playground started on http://localhost:${process.env.PORT}/graphql`,
    );
  }
};

bootstrap();
