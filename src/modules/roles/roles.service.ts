import { Role } from './role.entity';
import { BaseRolesService, SystemRole } from '@deeepvision/nest-kit/dist/modules/roles';

export class RolesService extends BaseRolesService<Role> {
  constructor() {
    super(
      SystemRole.SUPERADMIN,
      SystemRole.ORGANIZATION_ADMIN,
    );
  }
}
