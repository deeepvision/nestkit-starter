// src/modules/user-to-roles/user-to-roles.service.ts

import { InjectRepository } from '@nestjs/typeorm';
import {
  InjectWinstonLoggerFactory,
  WinstonLoggerFactory,
} from '@deeepvision/nest-kit';
import { BaseUserToRolesService } from '@deeepvision/nest-kit/dist/modules/user-to-roles';
import { IdService } from '@deeepvision/nest-kit/dist/modules/id';
import { Repository } from 'typeorm';
import { UserToRole } from './user-to-role.entity';

export class UserToRolesService extends BaseUserToRolesService<UserToRole> {
  constructor(
    @InjectRepository(UserToRole) userToRoleRepository: Repository<UserToRole>,
  ) {
    super(
      userToRoleRepository,
    );
  }
}
