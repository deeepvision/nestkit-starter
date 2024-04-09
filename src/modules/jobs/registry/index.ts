import { withDashEnv } from '@deeepvision/nest-kit';
import { JobRegistry, ScheduledJobRegistryItem } from '@deeepvision/nest-kit/dist/modules/jobs';

import { WorkerType } from '../types/common';
import { TestJob } from './test-job.entity';

export const jobRegistry: JobRegistry = {
  [TestJob.name]: TestJob,
};

export const jobTypeToWorkerType: Record<string, WorkerType> = {
  [TestJob.name]: WorkerType.AIRPLANE,
};

export const scheduledJobRegistry: ScheduledJobRegistryItem[] = [];

export const workerTypeToCloudRunJobName: Record<string, string> = {
  [WorkerType.DIGGER]: `nestkit-digger-worker${withDashEnv()}`,
};
