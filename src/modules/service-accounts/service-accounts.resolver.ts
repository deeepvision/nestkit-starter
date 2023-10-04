import { BaseServiceAccountsResolver } from '@deeepvision/nest-kit/dist/modules/service-accounts';
import { Resolver } from '@nestjs/graphql';

import { Organization } from '../organizations/organization.entity';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { User } from '../users/user.entity';

@Resolver()
export class ServiceAccountsResolver extends BaseServiceAccountsResolver<User, UserToRole, Organization>(User) {}
