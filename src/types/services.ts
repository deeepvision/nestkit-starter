import { User } from '@/modules/users/user.entity';
import { BaseServiceMethodContext } from '@deeepvision/nest-kit';

export interface ServiceMethodContext extends BaseServiceMethodContext {
  user: User;
}
