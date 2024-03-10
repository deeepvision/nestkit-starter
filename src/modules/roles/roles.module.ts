import { ROLES_SERVICE_TOKEN } from '@deeepvision/nest-kit/dist/modules/roles';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationsModule } from '../organizations/organizations.module';
import { Role } from './role.entity';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    OrganizationsModule,
  ],
  providers: [
    RolesService,
    {
      provide: ROLES_SERVICE_TOKEN,
      useExisting: RolesService,
    },
    RolesResolver,
  ],
  exports: [
    RolesService,
    {
      provide: ROLES_SERVICE_TOKEN,
      useExisting: RolesService,
    },
  ],
})
export class RolesModule {}

