import { BaseServiceTokensService } from '@deeepvision/nest-kit/dist/modules/service-accounts';
import { Injectable } from '@nestjs/common';

import { User } from '@/modules/users/user.entity';

import { ServiceToken } from './service-token.entity';

@Injectable()
export class ServiceTokensService extends BaseServiceTokensService<User, ServiceToken> {}
