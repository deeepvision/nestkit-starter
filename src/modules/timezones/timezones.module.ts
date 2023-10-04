import { Module } from '@nestjs/common';
import { TimezonesResolver } from './timezones.resolver';
import { TimezonesService } from './timezones.service';
import { TIMEZONES_SERVICE_TOKEN } from '@deeepvision/nest-kit/dist/modules/timezones';

@Module({
  providers: [
    TimezonesService,
    {
      provide: TIMEZONES_SERVICE_TOKEN,
      useExisting: TimezonesService,
    },
    TimezonesResolver,
  ],
  exports: [
    TimezonesService,
    {
      provide: TIMEZONES_SERVICE_TOKEN,
      useExisting: TimezonesService,
    },
  ],
})
export class TimezonesModule {}

