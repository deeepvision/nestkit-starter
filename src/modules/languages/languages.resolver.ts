
import { BaseLanguagesResolver, Language } from '@deeepvision/nest-kit/dist/modules/languages';
import { Resolver } from '@nestjs/graphql';
import { LanguagesService } from './languages.service';

@Resolver(() => Language)
export class LanguagesResolver extends BaseLanguagesResolver() {
  constructor(
    protected readonly languagesService: LanguagesService,
  ) {
    super(languagesService);
  }
}
