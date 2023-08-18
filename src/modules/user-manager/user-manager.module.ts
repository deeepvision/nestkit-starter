
import { USER_MANAGER } from '@deeepvision/nest-kit';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceToken } from '../service-accounts/service-tokens/service-token.entity';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { UserManager } from './user-manager.class';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserToRole, ServiceToken]),
    UsersModule,
  ],
  providers: [
    UserManager,
    {
      provide: USER_MANAGER,
      useExisting: UserManager,
    },
  ],
  exports: [
    UserManager,
    {
      provide: USER_MANAGER,
      useExisting: UserManager,
    },
  ],
})
export class UserManagerModule {}
