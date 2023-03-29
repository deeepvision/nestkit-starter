import { BaseRolesResolver } from '@deeepvision/nest-kit/dist/modules/roles';
import { Resolver } from '@nestjs/graphql';
import { Role } from './role.entity';
import { RolesService } from './roles.service';

@Resolver(() => Role)
export class RolesResolver extends BaseRolesResolver(Role) {
  constructor(
    protected readonly rolesService: RolesService,
  ) {
    super(rolesService);
  }
}
