// src/modules/timezones/timezones.service.ts

import { Injectable } from '@nestjs/common';
import { BaseTimezonesService } from '@deeepvision/nest-kit/dist/modules/timezones';

@Injectable()
export class TimezonesService extends BaseTimezonesService {}
