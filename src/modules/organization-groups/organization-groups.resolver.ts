import { BaseOrganizationGroupsResolver } from '@deeepvision/nest-kit/dist/modules/organization-groups';
import { Resolver } from '@nestjs/graphql';
import { OrganizationGroup } from './organization-group.entity';
import { OrganizationGroupsService } from './organization-groups.service';

@Resolver(() => OrganizationGroup)
export class OrganizationGroupsResolver extends BaseOrganizationGroupsResolver(OrganizationGroup) {
  constructor(
    protected readonly organizationGroupsService: OrganizationGroupsService,
  ) {
    super(organizationGroupsService);
  }
}
