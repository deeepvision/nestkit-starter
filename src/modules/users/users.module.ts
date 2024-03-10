import {
  InvitationStatusChange, InvitationStatusChangesService, USERS_SERVICE_TOKEN,
} from '@deeepvision/nest-kit/dist/modules/users';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationsModule } from '../organizations/organizations.module';
import { TimezonesModule } from '../timezones/timezones.module';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { UserToRolesModule } from '../user-to-roles/user-to-roles.module';
import { User } from './user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserToRole, InvitationStatusChange]),
    OrganizationsModule,
    TimezonesModule,
    UserToRolesModule,
  ],
  providers: [
    UsersService,
    {
      provide: USERS_SERVICE_TOKEN,
      useExisting: UsersService,
    },
    UsersResolver,
    InvitationStatusChangesService,
  ],
  exports: [
    UsersService,
    {
      provide: USERS_SERVICE_TOKEN,
      useExisting: UsersService,
    },
    InvitationStatusChangesService,
  ],
})
export class UsersModule {}
