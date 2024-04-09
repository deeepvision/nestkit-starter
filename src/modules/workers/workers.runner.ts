import { BaseWorkerRunner } from '@deeepvision/nest-kit/dist/modules/workers';
import { Injectable } from '@nestjs/common';

import { JobsService } from '@/modules/jobs/jobs.service';

import { workersRegistry } from './registry';

@Injectable()
export class WorkersRunner extends BaseWorkerRunner {
  constructor(
    protected readonly jobsService: JobsService,
  ) {
    super(
      jobsService,
      workersRegistry,
    );
  }
}
