// src/modules/user-to-roles/user-to-roles.module.ts

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
    UserToRolesResolver,
  ],
  exports: [
    UserToRolesService,
  ],
})
export class UserToRolesModule {}
