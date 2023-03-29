import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { User } from './user.entity';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { OrganizationsModule } from '../organizations/organizations.module';
import { TimezonesModule } from '../timezones/timezones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserToRole]),
    OrganizationsModule,
    TimezonesModule,
  ],
  providers: [
    UsersService,
    UsersResolver,
  ],
  exports: [
    UsersService,
    TypeOrmModule,
  ],
})
export class UsersModule {}
