import { BaseJobsService, CreateJobOptions } from '@deeepvision/nest-kit/dist/modules/jobs';
import { Injectable } from '@nestjs/common';

import { ServiceMethodContext } from '@/types/services';

import {
  jobRegistry, jobTypeToWorkerType, scheduledJobRegistry, workerTypeToCloudRunJobName,
} from './registry';
import { TestJob, TestJobMeta } from './registry/test-job.entity';

@Injectable()
export class JobsService extends BaseJobsService {
  constructor() {
    super(
      jobRegistry,
      jobTypeToWorkerType,
      workerTypeToCloudRunJobName,
      scheduledJobRegistry,
    );
  }
  async createTestJob(opts: CreateJobOptions<TestJobMeta>, ctx: ServiceMethodContext) {
    return await this.create(TestJob, opts, ctx);
  }
}
