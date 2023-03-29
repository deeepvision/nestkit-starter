import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { BaseRolesService, SystemRole } from '@deeepvision/nest-kit/dist/modules/roles';
import { OrganizationsService } from '../organizations/organizations.service';

export class RolesService extends BaseRolesService<Role> {
  constructor(
    @InjectRepository(Role) roleRepository: Repository<Role>,
      protected readonly organizationsService: OrganizationsService,
  ) {
    super(
      roleRepository,
      organizationsService,
      SystemRole.SUPERADMIN,
      SystemRole.ORGANIZATION_ADMIN,
    );
  }
}
