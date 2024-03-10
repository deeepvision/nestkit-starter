// src/modules/timezones/timezones.service.ts

import { BaseTimezonesService } from '@deeepvision/nest-kit/dist/modules/timezones';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TimezonesService extends BaseTimezonesService {}
