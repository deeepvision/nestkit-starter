import { InjectWinstonLoggerFactory, WinstonLoggerFactory } from '@deeepvision/nest-kit';
import { IdService } from '@deeepvision/nest-kit/dist/modules/id';
import { BaseServiceAccountsService } from '@deeepvision/nest-kit/dist/modules/service-accounts';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { JwtConfig } from '@/config';

import { Organization } from '../organizations/organization.entity';
import { OrganizationsService } from '../organizations/organizations.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { UserToRolesService } from '../user-to-roles/user-to-roles.service';

@Injectable()
export  class ServiceAccountsService extends BaseServiceAccountsService<User, UserToRole, Organization> {
  constructor(
    protected readonly idService: IdService,
    @InjectWinstonLoggerFactory() protected readonly loggerFactory: WinstonLoggerFactory,
    @Inject(JwtConfig.KEY) protected readonly jwtConfig: ConfigType<typeof JwtConfig>,
    protected readonly usersService: UsersService,
    protected readonly userToRolesService: UserToRolesService,
    protected readonly organizationsService: OrganizationsService,
  ) {
    super(
      usersService,
      userToRolesService,
      organizationsService,
    );
  }

  generateEntityId() {
    return this.idService.generateEntityId('sa', 'hc');
  }
}
