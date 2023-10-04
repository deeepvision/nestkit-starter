// src/modules/autn-n/otp/otp.resolver.ts

import { User } from '@/modules/users/user.entity';
import { BaseOtpResolver } from '@deeepvision/nest-kit/dist/modules/auth-n';
import { Resolver } from '@nestjs/graphql';

@Resolver()
export class OtpResolver extends BaseOtpResolver(User) {}
