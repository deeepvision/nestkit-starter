import { ChildEntity } from 'typeorm';
import { BaseRefreshToken } from '@deeepvision/nest-kit/dist/modules/auth-n';
import { User } from '@/modules/users/user.entity';

@ChildEntity()
export class RefreshToken extends BaseRefreshToken {
  user!: Promise<User>;
}
