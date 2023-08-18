import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationsModule } from '../organizations/organizations.module';
import { UserToRolesModule } from '../user-to-roles/user-to-roles.module';
import { UsersModule } from '../users/users.module';
import { ServiceAccountsResolver } from './service-accounts.resolver';
import { ServiceAccountsService } from './service-accounts.service';
import { ServiceToken } from './service-tokens/service-token.entity';
import { ServiceTokensResolver } from './service-tokens/service-tokens.resolver';
import { ServiceTokensService } from './service-tokens/service-tokens.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceToken,
    ]),
    UsersModule,
    UserToRolesModule,
    OrganizationsModule,
  ],
  providers: [
    ServiceAccountsService,
    ServiceAccountsResolver,
    ServiceTokensService,
    ServiceTokensResolver,
  ],
  exports: [
    ServiceAccountsService,
  ],
})
export class ServiceAccountsModule {}
