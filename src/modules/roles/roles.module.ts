import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    OrganizationsModule,
  ],
  providers: [
    RolesService,
    RolesResolver,
  ],
  exports: [
    RolesService,
  ],
})
export class RolesModule {}

