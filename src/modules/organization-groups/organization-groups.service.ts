import { BaseOrganizationGroupsService } from '@deeepvision/nest-kit/dist/modules/organization-groups';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { OrganizationGroup } from './organization-group.entity';
import { Organization } from '@/modules/organizations/organization.entity';

export class OrganizationGroupsService extends BaseOrganizationGroupsService<OrganizationGroup> {
  constructor(
    @InjectRepository(OrganizationGroup) organizationGroupRepository: Repository<OrganizationGroup>,
    @InjectRepository(Organization) organizationRepository: Repository<Organization>,
      protected readonly imagesService: ImagesService,
  ) {
    super(
      organizationGroupRepository,
      organizationRepository,
      imagesService,
    );
  }
}
