import { BaseLanguagesResolver, Language } from '@deeepvision/nest-kit/dist/modules/languages';
import { Resolver } from '@nestjs/graphql';

@Resolver(() => Language)
export class LanguagesResolver extends BaseLanguagesResolver() {}
