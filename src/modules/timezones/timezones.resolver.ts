import { BaseTimezonesResolver, Timezone } from '@deeepvision/nest-kit/dist/modules/timezones';
import { Resolver } from '@nestjs/graphql';
import { TimezonesService } from './timezones.service';

@Resolver(() => Timezone)
export class TimezonesResolver extends BaseTimezonesResolver() {
  constructor(
    protected readonly timezonesService: TimezonesService,
  ) {
    super(timezonesService);
  }
}
