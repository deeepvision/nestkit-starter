import { Module } from '@nestjs/common';
import { TimezonesResolver } from './timezones.resolver';
import { TimezonesService } from './timezones.service';

@Module({
  providers: [
    TimezonesService,
    TimezonesResolver,
  ],
  exports: [
    TimezonesService,
  ],
})
export class TimezonesModule {}

