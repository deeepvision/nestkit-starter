import { BaseServiceAccountsService } from '@deeepvision/nest-kit/dist/modules/service-accounts';
import { Injectable } from '@nestjs/common';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { UserToRolesService } from '../user-to-roles/user-to-roles.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export  class ServiceAccountsService extends BaseServiceAccountsService<User, UserToRole> {
  constructor(
    protected readonly usersService: UsersService,
    protected readonly userToRolesService: UserToRolesService,
  ) {
    super(
      usersService,
      userToRolesService,
    );
  }
}
