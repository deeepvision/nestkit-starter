import { BaseRolesService, SystemRole } from '@deeepvision/nest-kit/dist/modules/roles';

import { Role } from './role.entity';

export class RolesService extends BaseRolesService<Role> {
  constructor() {
    super(
      SystemRole.SUPERADMIN,
      SystemRole.ORGANIZATION_ADMIN,
    );
  }
}
