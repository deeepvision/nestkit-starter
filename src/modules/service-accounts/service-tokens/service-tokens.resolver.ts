import { BaseServiceTokensResolver } from '@deeepvision/nest-kit/dist/modules/service-accounts';
import { Resolver } from '@nestjs/graphql';

import { User } from '@/modules/users/user.entity';

import { ServiceToken } from './service-token.entity';
import { ServiceTokensService } from './service-tokens.service';

@Resolver()
export class ServiceTokensResolver extends BaseServiceTokensResolver<User, ServiceToken>(ServiceToken) {
  constructor(
    protected readonly serviceTokensService: ServiceTokensService,
  ) {
    super(
      serviceTokensService,
    );
  }
}
