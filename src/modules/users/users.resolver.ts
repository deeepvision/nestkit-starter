// src/modules/users/users.resolver.ts

import {
  InjectWinstonLoggerFactory, USER_MANAGER, WinstonLoggerFactory,
} from '@deeepvision/nest-kit';
import { BaseUsersResolver } from '@deeepvision/nest-kit/dist/modules/users';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { Organization } from '../organizations/organization.entity';
import { OrganizationsService } from '../organizations/organizations.service';
import { TimezonesService } from '../timezones/timezones.service';
import { UserManager } from '../user-manager/user-manager.class';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver extends BaseUsersResolver(User, Organization) {
  constructor(
    protected readonly usersService: UsersService,
    @Inject(USER_MANAGER) protected readonly userManager: UserManager,
    protected readonly organizationsService: OrganizationsService,
    protected readonly timezonesService: TimezonesService,
    @InjectWinstonLoggerFactory() protected readonly loggerFactory: WinstonLoggerFactory,
  ) {
    super(
      usersService,
      organizationsService,
      timezonesService,
    );
  }
}
