// src/modules/user-to-roles/user-to-roles.resolver.ts

import { BaseUserToRolesResolver } from '@deeepvision/nest-kit/dist/modules/user-to-roles';
import { Resolver } from '@nestjs/graphql';

import { UserToRole } from './user-to-role.entity';
import { UserToRolesService } from './user-to-roles.service';

@Resolver(() => UserToRole)
export class UserToRolesResolver extends BaseUserToRolesResolver(UserToRole) {
  constructor(
    protected readonly userToRolesService: UserToRolesService,
  ) {
    super(userToRolesService);
  }
}
