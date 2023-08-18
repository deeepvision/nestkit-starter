import { BaseServiceAccountsResolver } from '@deeepvision/nest-kit/dist/modules/service-accounts';
import { Resolver } from '@nestjs/graphql';

import { Organization } from '../organizations/organization.entity';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { User } from '../users/user.entity';
import { ServiceAccountsService } from './service-accounts.service';

@Resolver()
export class ServiceAccountsResolver extends BaseServiceAccountsResolver<User, UserToRole, Organization>(User) {
  constructor(
    protected readonly serviceAccountsService: ServiceAccountsService,
  ) {
    super(
      serviceAccountsService,
    );
  }
}
