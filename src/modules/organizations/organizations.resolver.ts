// src/modules/organizations/organizations.resolver.ts

import { BaseOrganizationsResolver } from '@deeepvision/nest-kit/dist/modules/organizations';
import { Resolver } from '@nestjs/graphql';
import { TimezonesService } from '../timezones/timezones.service';
import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';

@Resolver(() => Organization)
export class OrganizationsResolver extends BaseOrganizationsResolver(Organization) {
  constructor(
    protected readonly organizationsService: OrganizationsService,
    protected readonly timezonesService: TimezonesService,
  ) {
    super(
      organizationsService,
      timezonesService,
    );
  }
}
