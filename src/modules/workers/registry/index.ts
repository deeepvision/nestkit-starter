import { WorkerRegistry } from '@deeepvision/nest-kit/dist/modules/workers';

import { TestWorker } from './test.worker';

export const workersRegistry: WorkerRegistry = {
  [TestWorker.name]: TestWorker,
};
