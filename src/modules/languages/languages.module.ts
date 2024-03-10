import { LANGUAGES_SERVICE_TOKEN } from '@deeepvision/nest-kit/dist/modules/languages';
import { Module } from '@nestjs/common';

import { LanguagesResolver } from './languages.resolver';
import { LanguagesService } from './languages.service';

@Module({
  providers: [
    LanguagesService,
    {
      provide: LANGUAGES_SERVICE_TOKEN,
      useExisting: LanguagesService,
    },
    LanguagesResolver,
  ],
  exports: [
    LanguagesService,
    {
      provide: LANGUAGES_SERVICE_TOKEN,
      useExisting: LanguagesService,
    },
  ],
})
export class LanguagesModule {}
