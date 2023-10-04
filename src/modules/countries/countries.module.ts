import { Module } from '@nestjs/common';
import { CountriesResolver } from './countries.resolver';
import { CountriesService } from './countries.service';
import { COUNTRIES_SERVICE_TOKEN } from '@deeepvision/nest-kit/dist/modules/countries';

@Module({
  providers: [
    CountriesService,
    {
      provide: COUNTRIES_SERVICE_TOKEN,
      useExisting: CountriesService,
    },
    CountriesResolver,
  ],
  exports: [
    CountriesService,
    {
      provide: COUNTRIES_SERVICE_TOKEN,
      useExisting: CountriesService,
    },
  ],
})
export class CountriesModule {}
