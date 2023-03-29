import { BaseAuthNResolver } from '@deeepvision/nest-kit/dist/modules/auth-n';
import { Resolver } from '@nestjs/graphql';
import { User } from '@/modules//users/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { AuthNService } from './auth-n.service';

@Resolver()
export class AuthNResolver extends BaseAuthNResolver(User, RefreshToken) {
  constructor(
    protected readonly authNService: AuthNService,
  ) {
    super(authNService);
  }
}
