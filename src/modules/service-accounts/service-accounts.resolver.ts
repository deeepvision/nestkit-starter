
import { Resolver } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { BaseServiceAccountsResolver } from '@deeepvision/nest-kit/dist/modules/service-accounts';
import { ServiceAccountsService } from './service-accounts.service';
import { UserToRole } from '../user-to-roles/user-to-role.entity';

@Resolver()
export class ServiceAccountsResolver extends BaseServiceAccountsResolver<User, UserToRole>(User) {
  constructor(
    protected readonly serviceAccountsService: ServiceAccountsService,
  ) {
    super(serviceAccountsService);
  }
}
