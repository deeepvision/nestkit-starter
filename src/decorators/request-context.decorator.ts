
import { User } from '@/modules/users/user.entity';
import { Permission } from '@/permissions';
import { ActionScopes, ActionScopesArray } from '@deeepvision/auth';
import { IBaseActionContext } from '@deeepvision/nest-kit';

export interface IActionContext extends IBaseActionContext<User> {
  isGranted(permission: Permission, scopes?: ActionScopes | ActionScopesArray): boolean;
}
