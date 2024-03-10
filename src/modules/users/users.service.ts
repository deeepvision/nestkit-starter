import { BaseUsersService } from '@deeepvision/nest-kit/dist/modules/users';

import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { User } from './user.entity';

export class UsersService extends BaseUsersService<User, UserToRole> {}
