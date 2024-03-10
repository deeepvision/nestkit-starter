import { BaseOtpService } from '@deeepvision/nest-kit/dist/modules/auth-n';
import { Injectable } from '@nestjs/common';

import { User } from '@/modules/users/user.entity';

@Injectable()
export class OtpService extends BaseOtpService<User> {}
