import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { OrganizationsModule } from '../organizations/organizations.module';
import { User } from './user.entity';
import { TimezonesModule } from '../timezones/timezones.module';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { InvitationStatusChange, InvitationStatusChangesService } from '@deeepvision/nest-kit/dist/modules/users';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserToRole, InvitationStatusChange]),
    OrganizationsModule,
    TimezonesModule,
  ],
  providers: [
    UsersService,
    UsersResolver,
    InvitationStatusChangesService,
  ],
  exports: [
    UsersService,
    InvitationStatusChangesService,
  ],
})
export class UsersModule {}
