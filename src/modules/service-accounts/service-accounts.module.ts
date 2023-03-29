import { Module } from '@nestjs/common';
import { ServiceAccountsService } from './service-accounts.service';
import { ServiceAccountsResolver } from './service-accounts.resolver';
import { UsersModule } from '../users/users.module';
import { UserToRolesModule } from '../user-to-roles/user-to-roles.module';

@Module({
  imports: [
    UsersModule,
    UserToRolesModule,
  ],
  providers: [
    ServiceAccountsService,
    ServiceAccountsResolver,
  ],
  exports: [
    ServiceAccountsService,
  ],
})
export class ServiceAccountsModule {}
