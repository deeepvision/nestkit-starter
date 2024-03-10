import {
  AUTHN_SERVICE_TOKEN, JWT_SERVICE_TOKEN, OTP_SERVICE_TOKEN,
} from '@deeepvision/nest-kit/dist/modules/auth-n';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationsModule } from '../organizations/organizations.module';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthNController } from './auth-n.controller';
import { AuthNResolver } from './auth-n.resolver';
import { AuthNService } from './auth-n.service';
import { RefreshToken } from './entities/refresh-token.entity';
import { JwtService } from './jwt/jwt.service';
import { OtpResolver } from './otp/otp.resolver';
import { OtpService } from './otp/otp.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken, User, UserToRole]),
    OrganizationsModule,
    UsersModule,
  ],
  controllers: [AuthNController],
  providers: [
    AuthNService,
    AuthNResolver,
    JwtService,
    OtpService,
    OtpResolver,
    {
      provide: OTP_SERVICE_TOKEN,
      useExisting: OtpService,
    },
    {
      provide: JWT_SERVICE_TOKEN,
      useExisting: JwtService,
    },
    {
      provide: AUTHN_SERVICE_TOKEN,
      useExisting: AuthNService,
    },
  ],
})
export class AuthNModule {}
