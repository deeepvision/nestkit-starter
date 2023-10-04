import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';

import { OrganizationGroup } from './organization-group.entity';
import { OrganizationGroupsResolver } from './organization-groups.resolver';
import { OrganizationGroupsService } from './organization-groups.service';
import { Organization } from '@/modules/organizations/organization.entity';
import { ORGANIZATION_GROUPS_SERVICE_TOKEN } from '@deeepvision/nest-kit/dist/modules/organization-groups';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationGroup, Organization]),
    ImagesModule,
  ],
  providers: [
    OrganizationGroupsService,
    {
      provide: ORGANIZATION_GROUPS_SERVICE_TOKEN,
      useExisting: OrganizationGroupsService,
    },
    OrganizationGroupsResolver,
  ],
  exports: [
    OrganizationGroupsService,
    {
      provide: ORGANIZATION_GROUPS_SERVICE_TOKEN,
      useExisting: OrganizationGroupsService,
    },
    TypeOrmModule,
  ],
})
export class OrganizationGroupsModule {}
