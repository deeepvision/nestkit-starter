import { BaseServiceTokensService } from '@deeepvision/nest-kit/dist/modules/service-accounts';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/modules/users/user.entity';
import { UsersService } from '@/modules/users/users.service';

import { ServiceToken } from './service-token.entity';

@Injectable()
export class ServiceTokensService extends BaseServiceTokensService<User, ServiceToken> {
  constructor(
    @InjectRepository(ServiceToken) protected readonly serviceTokenRepository: Repository<ServiceToken>,
    protected readonly usersService: UsersService,
  ) {
    super(
      serviceTokenRepository,
      usersService,
    );
  }
}
