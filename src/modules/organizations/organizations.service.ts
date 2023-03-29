import { BaseOrganizationsService } from '@deeepvision/nest-kit/dist/modules/organizations';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { ImagesService } from '../images/images.service';
import { Organization } from './organization.entity';

export class OrganizationsService extends BaseOrganizationsService<Organization> {
  constructor(
    @InjectRepository(Organization) organizationRepository: Repository<Organization>,
    @InjectRepository(UserToRole) protected readonly userToRoleRepository: Repository<UserToRole>,
    protected readonly imagesService: ImagesService,
  ) {
    super(
      organizationRepository,
      imagesService,
    );
  }
}
