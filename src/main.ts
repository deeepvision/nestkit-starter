import {
  AppEnv, HttpExceptionFilter, NESTKIT_WINSTON_LOGGER_FACTORY_PROVIDER, NESTKIT_WINSTON_SYSTEM_LOGGER_PROVIDER, publishSchemaToApolloStudio,
} from '@deeepvision/nest-kit';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { NestExpressApplication } from '@nestjs/platform-express';
import bodyParser from 'body-parser';
import hbs from 'hbs';
import { resolve } from 'path';

import { AppModule } from '@/app.module';

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

  if (process.env.APP_ENV !== AppEnv.LOCAL && process.env.APP_ENV !== AppEnv.TEST) {
    const { schema } = app.get(GraphQLSchemaHost);

    await publishSchemaToApolloStudio(schema, logger);
  }
};

bootstrap();
