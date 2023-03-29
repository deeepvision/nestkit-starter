import { User } from '@/modules/users/user.entity';
import { UsersService } from '@/modules/users/users.service';
import { BaseOtpService } from '@deeepvision/nest-kit/dist/modules/auth-n';
import { Injectable } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class OtpService extends BaseOtpService<User> {
  constructor(
    jwtService: JwtService,
    usersService: UsersService,
  ) {
    super(
      jwtService,
      usersService,
    );
  }
}
