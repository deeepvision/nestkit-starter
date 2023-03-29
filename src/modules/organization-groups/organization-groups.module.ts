import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';

import { OrganizationGroup } from './organization-group.entity';
import { OrganizationGroupsResolver } from './organization-groups.resolver';
import { OrganizationGroupsService } from './organization-groups.service';
import { Organization } from '@/modules/organizations/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationGroup, Organization]),
    ImagesModule,
  ],
  providers: [
    OrganizationGroupsService,
    OrganizationGroupsResolver,
  ],
  exports: [
    OrganizationGroupsService,
    TypeOrmModule,
  ],
})
export class OrganizationGroupsModule {}
