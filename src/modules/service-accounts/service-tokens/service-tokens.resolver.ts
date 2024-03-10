import { BaseServiceTokensResolver } from '@deeepvision/nest-kit/dist/modules/service-accounts';
import { Resolver } from '@nestjs/graphql';

import { User } from '@/modules/users/user.entity';

import { ServiceToken } from './service-token.entity';

@Resolver()
export class ServiceTokensResolver extends BaseServiceTokensResolver<User, ServiceToken>(ServiceToken) {}
