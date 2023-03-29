import { Module } from '@nestjs/common';
import { LanguagesResolver } from './languages.resolver';
import { LanguagesService } from './languages.service';

@Module({
  providers: [
    LanguagesService,
    LanguagesResolver,
  ],
  exports: [
    LanguagesService,
  ],
})
export class LanguagesModule {}
