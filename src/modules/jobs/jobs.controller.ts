import { JwtAuthGuard, PermissionsGuard } from '@deeepvision/nest-kit';
import { BaseJobsController } from '@deeepvision/nest-kit/dist/modules/jobs';
import {
  Controller,
  UseGuards,
} from '@nestjs/common';

@Controller('jobs')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class JobsController extends BaseJobsController() {
  constructor() {
    super();
  }
}
