import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {
  WinstonModule, createGraphQLContext, AppEnv,
} from '@deeepvision/nest-kit';
import { GcsModule } from '@deeepvision/nest-kit/dist/modules/gcs';
import { IdModule } from '@deeepvision/nest-kit/dist/modules/id';
import { BiblesModule } from '@deeepvision/nest-kit/dist/modules/bibles';
import {
  I18nModule, I18nJsonLoader, HeaderResolver, I18nService,
} from 'nestjs-i18n';
import { resolve } from 'node:path';
// eslint-disable-next-line node/no-extraneous-import
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';

import * as configs from '@/config';
import { ImagesModule } from './modules/images/images.module';
import { EmailsModule } from './modules/emails/emails.module';
import { TimezonesModule } from './modules/timezones/timezones.module';
import { OrganizationGroupsModule } from './modules/organization-groups/organization-groups.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { UsersModule } from './modules/users/users.module';
import { UserToRolesModule } from './modules/user-to-roles/user-to-roles.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserManagerModule } from './modules/user-manager/user-manager.module';
import { AuthNModule } from './modules/auth-n/auth-n.module';
import { BinaryFilesModule } from './modules/binary-files/binary-files.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { CountriesModule } from './modules/countries/countries.module';
import { ServiceAccountsModule } from './modules/service-accounts/service-accounts.module';
import { BooksModule } from './modules/books/books.module';

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
      useFactory: (appConfig: ConfigType<typeof configs.AppConfig>) => {
        const apolloServerPlugins = [];
        if (appConfig.env === AppEnv.LOCAL) {
          apolloServerPlugins.push(ApolloServerPluginLandingPageLocalDefault({
            embed: true,
          }));
        } else if (appConfig.env !== AppEnv.PRODUCTION && process.env.APOLLO_GRAPH_REF) {
          apolloServerPlugins.push(ApolloServerPluginLandingPageProductionDefault({
            graphRef: process.env.APOLLO_GRAPH_REF,
            embed: true,
          }));
        } else {
          apolloServerPlugins.push(ApolloServerPluginLandingPageProductionDefault());
        }

        return {
          autoSchemaFile: true,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          context: (ctx: any) => createGraphQLContext({
            app: appConfig.shortname,
            connectionParams: ctx.connectionParams,
          }),
          playground: false,
          plugins: apolloServerPlugins,
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
  ],
  providers: [],
})
export class AppModule {}
