// src/modules/user-manager/user-manager.class.ts

import { BaseUserManager } from '@deeepvision/nest-kit/dist/modules/user-manager';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { commonAuthorizedUsersPermissions, commonUsersPermissions } from '@/permissions/registry';
import { UserToRole } from '../user-to-roles/user-to-role.entity';

@Injectable()
export class UserManager extends BaseUserManager<User> {
  constructor(
    @InjectRepository(User) protected readonly userRepository: Repository<User>,
    @InjectRepository(UserToRole) protected readonly userToRoleRepository: Repository<UserToRole>,
  ) {
    super(
      userRepository,
      userToRoleRepository,
      [],
      commonUsersPermissions,
      commonAuthorizedUsersPermissions,
    );
  }
}
