import {
  JobResult, JobResultStatus, JobWorker,
} from '@deeepvision/nest-kit/dist/modules/workers';
import { Injectable } from '@nestjs/common';

import { TestJob } from '@/modules/jobs/registry/test-job.entity';

import { JobWorkerContext } from '../types/context';

@Injectable()
export class TestWorker extends JobWorker<JobWorkerContext<TestJob>> {
  constructor() {
    super();
  }

  async run(): Promise<JobResult> {
    const { ctx } = this;
    const { job } = ctx;
    const { meta } = job;

    const logger = this.createLoggerForRun({
      ...meta,
    });

    try {
      logger.info(`Upload something to ${meta.uploadRegion} region...`);

      logger.info(`Uploading done ✅`);
    } catch (error) {
      if (error instanceof Error) {
        return {
          status: JobResultStatus.ERROR,
          error,
        };
      }
    }

    return {
      status: JobResultStatus.DONE,
    };
  }
}
