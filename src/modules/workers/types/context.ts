import { Job } from '@deeepvision/nest-kit/dist/modules/jobs';

import { ServiceMethodContext } from '@/types/services';

export interface JobWorkerContext<J extends Job> extends ServiceMethodContext {
  job: J;
}
