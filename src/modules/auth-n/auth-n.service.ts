import { BaseAuthNService } from '@deeepvision/nest-kit/dist/modules/auth-n';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { User } from '../users/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';

export class AuthNService extends BaseAuthNService<User, UserToRole, RefreshToken> {}
