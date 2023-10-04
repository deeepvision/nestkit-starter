import { BaseUserToRolesService } from '@deeepvision/nest-kit/dist/modules/user-to-roles';
import { UserToRole } from './user-to-role.entity';

export class UserToRolesService extends BaseUserToRolesService<UserToRole> {}
