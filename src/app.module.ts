import { resolve } from 'node:path';

import { ApolloServerPluginUsageReportingDisabled } from '@apollo/server/plugin/disabled';
// eslint-disable-next-line node/no-extraneous-import
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import {
  AppEnv, AppMiddleware, createGraphQLContext, createGraphQLErrorFormatter, NESTKIT_WINSTON_LOGGER_PROVIDER,
  WinstonLogger, WinstonModule,
} from '@deeepvision/nest-kit';
import { BiblesModule } from '@deeepvision/nest-kit/dist/modules/bibles';
import { CompanionModule } from '@deeepvision/nest-kit/dist/modules/companion';
import { GcsModule } from '@deeepvision/nest-kit/dist/modules/gcs';
import { IdModule } from '@deeepvision/nest-kit/dist/modules/id';
import { PostgresPubSubModule } from '@deeepvision/nest-kit/dist/modules/postgres-pubsub';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {
  HeaderResolver, I18nJsonLoader, I18nModule, I18nService,
} from 'nestjs-i18n';

import * as configs from '@/config';

import { AppResolver } from './app.resolver';
import { AuthNModule } from './modules/auth-n/auth-n.module';
import { BinaryFilesModule } from './modules/binary-files/binary-files.module';
import { BooksModule } from './modules/books/books.module';
import { CountriesModule } from './modules/countries/countries.module';
import { EmailsModule } from './modules/emails/emails.module';
import { ImagesModule } from './modules/images/images.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { OrganizationGroupsModule } from './modules/organization-groups/organization-groups.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { RolesModule } from './modules/roles/roles.module';
import { ServiceAccountsModule } from './modules/service-accounts/service-accounts.module';
import { TimezonesModule } from './modules/timezones/timezones.module';
import { UserManagerModule } from './modules/user-manager/user-manager.module';
import { UserToRolesModule } from './modules/user-to-roles/user-to-roles.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: Object.values(configs),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (dbConfig: ConfigType<typeof configs.DbConfig>) => dbConfig,
      inject: [configs.DbConfig.KEY],
    }),
    EventEmitterModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loader: I18nJsonLoader,
      resolvers: [HeaderResolver],
      loaderOptions: {
        path: resolve(__dirname, '../src/i18n/'),
        watch: true,
      },
      viewEngine: 'hbs',
      typesOutputPath: resolve(__dirname, '../src/i18n/types.ts'),
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      inject: [configs.MailerConfig.KEY, I18nService],
      useFactory: (config: ConfigType<typeof configs.MailerConfig>, i18n: I18nService) => {
        return {
          ...config,
          template: {
            dir: resolve(__dirname, '../src/resources/emails/'),
            adapter: new HandlebarsAdapter({
              t: i18n.hbsHelper,
            }),
            options: {
              strict: true,
            },
          },
          options: {
            partials: {
              dir: resolve(__dirname, '../src/resources/emails/partials/'),
              options: {
                strict: true,
              },
            },
          },
        };
      },
    }),
    WinstonModule.forRootAsync({
      inject: [configs.WinstonConfig.KEY],
      useFactory: async (opts: ConfigType<typeof configs.WinstonConfig>) => opts,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      inject: [configs.AppConfig.KEY],
      driver: ApolloDriver,
      useFactory: (
        appConfig: ConfigType<typeof configs.AppConfig>,
      ) => {
        const apolloServerPlugins = [];
        if (appConfig.env === AppEnv.LOCAL) {
          apolloServerPlugins.push(ApolloServerPluginLandingPageLocalDefault({
            embed: true,
          }));
        } else {
          apolloServerPlugins.push(ApolloServerPluginLandingPageProductionDefault());
        }

        apolloServerPlugins.push(ApolloServerPluginUsageReportingDisabled());

        return {
          autoSchemaFile: true,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          context: (ctx: any) => createGraphQLContext({
            app: appConfig.shortname,
            connectionParams: ctx.connectionParams?.connectionParams ?? ctx.connectionParams,
          }),
          formatError: createGraphQLErrorFormatter(appConfig),
          playground: false,
          plugins: apolloServerPlugins,
          subscriptions: {
            'graphql-ws': {
              path: appConfig.env === AppEnv.LOCAL ? '/graphql' : '/ws',
            },
          },
        };
      },
    }),
    IdModule,
    ImagesModule,
    EmailsModule,
    MailerModule,
    GcsModule,
    TimezonesModule,
    OrganizationGroupsModule,
    OrganizationsModule,
    UsersModule,
    UserToRolesModule,
    RolesModule,
    UserManagerModule,
    AuthNModule,
    BinaryFilesModule,
    LanguagesModule,
    CountriesModule,
    ServiceAccountsModule,
    BooksModule,
    BiblesModule,
    CompanionModule,
    PostgresPubSubModule,
  ],
  providers: [
    AppResolver,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware)
      .forRoutes('*');
  }
}
