import { BaseAuthNService } from '@deeepvision/nest-kit/dist/modules/auth-n';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { RefreshToken } from './entities/refresh-token.entity';
import { JwtService } from './jwt/jwt.service';

export class AuthNService extends BaseAuthNService<User, UserToRole, RefreshToken> {
  constructor(
    @InjectRepository(UserToRole) protected readonly userToRoleRepository: Repository<UserToRole>,
    jwtService: JwtService,
    usersService: UsersService,
  ) {
    super(
      userToRoleRepository,
      usersService,
      jwtService,
    );
  }
}
