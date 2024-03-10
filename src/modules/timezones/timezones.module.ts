import { TIMEZONES_SERVICE_TOKEN } from '@deeepvision/nest-kit/dist/modules/timezones';
import { Module } from '@nestjs/common';

import { TimezonesResolver } from './timezones.resolver';
import { TimezonesService } from './timezones.service';

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

