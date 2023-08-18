import { ActionScopes, ActionScopesArray } from '@deeepvision/auth';
import { IBaseActionContext } from '@deeepvision/nest-kit';

import { User } from '@/modules/users/user.entity';
import { Permission } from '@/permissions';

export interface IActionContext extends IBaseActionContext {
  user: User;
  isGranted(permission: Permission, authContext?: ActionScopes | ActionScopesArray): boolean;
}
