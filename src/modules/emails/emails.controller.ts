import {
  Controller, Get, Inject, Render,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { AppConfig } from '@/config';

@Controller('emails')
export class EmailsController {
  constructor(
    @Inject(AppConfig.KEY) protected readonly appConfig: ConfigType<typeof AppConfig>,
  ) {}

  @Get('/reset-password')
  @Render('reset-password')
  resetPassword() {
    return {
      resetPasswordLink: `${this.appConfig.uiHost}/recover-password?data=xxx`,
      i18nLang: 'en',
    };
  }

  @Get('/invite')
  @Render('invite')
  invite() {
    return {
      userInfo: {
        fullName: 'Tanya',
        password: 'gj28g957',
        email: 'tanya@example.com',
      },
      assignInfo: {
        organizationTitle: 'Hope Channel International',
        organizationLogoUrl: 'https://assets.jetstream.studio/brand/jsorg:33O0ldvawCD/logo-1640868524.png',
        roleTitle: 'administrator',
      },
      loginLink: 'https://bo.dev.hcidev.org/signin?email=tanya@gmail.com&continue=/',
      i18nLang: 'en',
    };
  }

  @Get('/email-updated')
  @Render('email-updated')
  updateEmail() {
    return {
      userInfo: {
        username: 'Tanya',
        email: 'tanya@example.com',
      },
      loginLink: `${this.appConfig.uiHost}/login`,
      i18nLang: 'en',
    };
  }
}
