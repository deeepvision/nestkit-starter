import { BaseServiceMethodContext } from '@deeepvision/nest-kit';

import { User } from '@/modules/users/user.entity';

export interface ServiceMethodContext extends BaseServiceMethodContext {
  user: User;
}
