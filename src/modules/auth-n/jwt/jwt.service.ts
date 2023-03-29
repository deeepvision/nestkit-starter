
import { JwtConfig } from '@/config';
import { User } from '@/modules/users/user.entity';
import { UsersService } from '@/modules/users/users.service';
import { InjectWinstonLoggerFactory, WinstonLoggerFactory } from '@deeepvision/nest-kit';
import { BaseJwtService } from '@deeepvision/nest-kit/dist/modules/auth-n';
import { IdService } from '@deeepvision/nest-kit/dist/modules/id';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
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
