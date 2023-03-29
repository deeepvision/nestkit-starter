import { Module } from '@nestjs/common';
import { CountriesResolver } from './countries.resolver';
import { CountriesService } from './countries.service';

@Module({
  providers: [
    CountriesService,
    CountriesResolver,
  ],
  exports: [
    CountriesService,
  ],
})
export class CountriesModule {}
