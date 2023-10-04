import { BaseRolesResolver } from '@deeepvision/nest-kit/dist/modules/roles';
import { Resolver } from '@nestjs/graphql';
import { Role } from './role.entity';

@Resolver(() => Role)
export class RolesResolver extends BaseRolesResolver(Role) {}
