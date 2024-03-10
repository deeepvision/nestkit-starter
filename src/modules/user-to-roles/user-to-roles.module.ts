// src/modules/user-to-roles/user-to-roles.module.ts

import { USER_TO_ROLES_SERVICE_TOKEN } from '@deeepvision/nest-kit/dist/modules/user-to-roles';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserToRole } from './user-to-role.entity';
import { UserToRolesResolver } from './user-to-roles.resolver';
import { UserToRolesService } from './user-to-roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserToRole]),
  ],
  providers: [
    UserToRolesService,
    {
      provide: USER_TO_ROLES_SERVICE_TOKEN,
      useExisting: UserToRolesService,
    },
    UserToRolesResolver,
  ],
  exports: [
    UserToRolesService,
    {
      provide: USER_TO_ROLES_SERVICE_TOKEN,
      useExisting: UserToRolesService,
    },
  ],
})
export class UserToRolesModule {}
