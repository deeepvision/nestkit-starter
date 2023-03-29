import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { OrganizationsModule } from '../organizations/organizations.module';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthNController } from './auth-n.controller';
import { AuthNResolver } from './auth-n.resolver';
import { AuthNService } from './auth-n.service';
import { JwtService } from './jwt/jwt.service';
import { OtpResolver } from './otp/otp.resolver';
import { OtpService } from './otp/otp.service';
import { RefreshToken } from './entities/refresh-token.entity';

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
  ],
})
export class AuthNModule {}
