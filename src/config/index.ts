import { useDotEnv } from '@deeepvision/dotenv-yaml';
import { AppEnv } from '@deeepvision/nest-kit';
import {
  createAppConfig,
  createAuthConfig,
  createDbConfig,
  createGcpConfig,
  createJwtConfig,
  createMailerConfig,
  createWinstonConfig,
} from '@deeepvision/nest-kit/dist/configs';

/* Inject environment variables from .env.yaml */
if (process.env.APP_ENV === AppEnv.LOCAL) {
  useDotEnv();
}

export const AppConfig = createAppConfig({
  name: 'NestKit Starter Kit',
  shortname: 'nst',
});

export const JwtConfig = createJwtConfig({
  iss: 'nst',
  aud: ['nst'],
});

export const DbConfig = createDbConfig({
  entities: [
    'dist/**/*.entity.js',
    'node_modules/@deeepvision/nest-kit/dist/modules/auth-n/**/*.entity.js',
    'node_modules/@deeepvision/nest-kit/dist/modules/user-to-roles/**/*.entity.js',
    'node_modules/@deeepvision/nest-kit/dist/modules/organization-groups/**/*.entity.js',
    'node_modules/@deeepvision/nest-kit/dist/modules/organizations/**/*.entity.js',
    'node_modules/@deeepvision/nest-kit/dist/modules/images/**/*.entity.js',
    'node_modules/@deeepvision/nest-kit/dist/modules/roles/**/*.entity.js',
    'node_modules/@deeepvision/nest-kit/dist/modules/users/**/*.entity.js',
    'node_modules/@deeepvision/nest-kit/dist/modules/jobs/**/*.entity.js',
    'node_modules/@deeepvision/nest-kit/dist/modules/binary-files/**/*.entity.js',
    'node_modules/@deeepvision/nest-kit/dist/modules/bibles/**/*.entity.js',
    'node_modules/@deeepvision/nest-kit/dist/modules/service-accounts/**/*.entity.js',
  ],
});

export const MailerConfig = createMailerConfig();

export const WinstonConfig = createWinstonConfig({
  appName: 'Nestkit Starter',
  useConsole: process.env.APP_ENV === AppEnv.LOCAL,
  useGoogleCloudLogging: process.env.APP_ENV !== AppEnv.LOCAL,
  googleCloudLoggingOptions: {
    logName: 'nestkit_starter',
  },
});

export const GcpConfig = createGcpConfig();

export const AuthConfig = createAuthConfig({
  waitingForApprovalAfterRegistration: true,
});
