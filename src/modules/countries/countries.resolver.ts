import { BaseCountriesResolver, Country } from '@deeepvision/nest-kit/dist/modules/countries';
import { Resolver } from '@nestjs/graphql';

import { CountriesService } from './countries.service';

@Resolver(() => Country)
export class CountriesResolver extends BaseCountriesResolver() {
  constructor(
    protected readonly countriesService: CountriesService,
  ) {
    super(countriesService);
  }
}
