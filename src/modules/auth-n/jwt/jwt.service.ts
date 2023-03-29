
import { User } from '@/modules/users/user.entity';
import { UsersService } from '@/modules/users/users.service';
import { BaseJwtService } from '@deeepvision/nest-kit/dist/modules/auth-n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';

@Injectable()
export class JwtService extends BaseJwtService<User, RefreshToken> {
  constructor(
    usersService: UsersService,
    @InjectRepository(RefreshToken) refreshTokenRepository: Repository<RefreshToken>,
  ) {
    super(
      usersService,
      refreshTokenRepository,
    );
  }
}
