import { BaseTimezonesResolver, Timezone } from '@deeepvision/nest-kit/dist/modules/timezones';
import { Resolver } from '@nestjs/graphql';

@Resolver(() => Timezone)
export class TimezonesResolver extends BaseTimezonesResolver() {}
