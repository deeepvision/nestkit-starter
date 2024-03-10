import { BaseOrganizationGroupsResolver } from '@deeepvision/nest-kit/dist/modules/organization-groups';
import { Resolver } from '@nestjs/graphql';

import { OrganizationGroup } from './organization-group.entity';

@Resolver(() => OrganizationGroup)
export class OrganizationGroupsResolver extends BaseOrganizationGroupsResolver(OrganizationGroup) {}
