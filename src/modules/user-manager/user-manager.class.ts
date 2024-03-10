// src/modules/user-manager/user-manager.class.ts

import { BaseUserManager } from '@deeepvision/nest-kit/dist/modules/user-manager';
import { Injectable } from '@nestjs/common';

import { commonAuthorizedUsersPermissions, commonUsersPermissions } from '@/permissions';

import { User } from '../users/user.entity';

@Injectable()
export class UserManager extends BaseUserManager<User> {
  constructor(
  ) {
    super(
      [],
      commonUsersPermissions,
      commonAuthorizedUsersPermissions,
    );
  }
}
