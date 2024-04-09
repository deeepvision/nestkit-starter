import { CloudRunJobsModule, JOBS_SERVICE_TOKEN } from '@deeepvision/nest-kit/dist/modules/jobs';
import { Module } from '@nestjs/common';

import { JobsController } from './jobs.controller';
import { JobsResolver } from './jobs.resolver';
import { JobsService } from './jobs.service';

@Module({
  imports: [
    CloudRunJobsModule,
  ],
  providers: [
    JobsService,
    {
      provide: JOBS_SERVICE_TOKEN,
      useExisting: JobsService,
    },
    JobsResolver,
  ],
  controllers: [
    JobsController,
  ],
  exports: [
    JobsService,
    {
      provide: JOBS_SERVICE_TOKEN,
      useExisting: JobsService,
    },
  ],
})
export class JobsModule {}
