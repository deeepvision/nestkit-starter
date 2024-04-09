import { BaseJobsResolver, Job } from '@deeepvision/nest-kit/dist/modules/jobs';
import { Resolver } from '@nestjs/graphql';

@Resolver(() => Job)
export class JobsResolver extends BaseJobsResolver(Job) {
  constructor() {
    super();
  }
}

