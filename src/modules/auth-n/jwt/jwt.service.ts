import { BaseJwtService } from '@deeepvision/nest-kit/dist/modules/auth-n';
import { Injectable } from '@nestjs/common';

import { User } from '@/modules/users/user.entity';

import { RefreshToken } from '../entities/refresh-token.entity';

@Injectable()
export class JwtService extends BaseJwtService<User, RefreshToken> {}
