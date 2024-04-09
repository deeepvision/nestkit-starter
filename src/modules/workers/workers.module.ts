import { Module } from '@nestjs/common';

import { JobsModule } from '../jobs/jobs.module';
import { workersRegistry } from './registry';
import { WorkersRunner } from './workers.runner';

@Module({
  imports: [
    JobsModule,
  ],
  providers: [
    WorkersRunner,
    ...Object.values(workersRegistry),
  ],
})
export class WorkersModule {
}
