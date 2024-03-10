// src/modules/autn-n/otp/otp.resolver.ts

import { BaseOtpResolver } from '@deeepvision/nest-kit/dist/modules/auth-n';
import { Resolver } from '@nestjs/graphql';

import { User } from '@/modules/users/user.entity';

@Resolver()
export class OtpResolver extends BaseOtpResolver(User) {}
