
import { User } from '@/modules/users/user.entity';
import { Permission } from '@/permissions/registry';
import { AuthContext, AuthContextInput } from '@deeepvision/auth';
import { IBaseActionContext } from '@deeepvision/nest-kit';

export interface IActionContext extends IBaseActionContext<User> {
  isGranted(permission: Permission, authContext?: AuthContextInput | AuthContext): boolean;
}
