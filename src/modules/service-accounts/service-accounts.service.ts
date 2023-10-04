import { BaseServiceAccountsService } from '@deeepvision/nest-kit/dist/modules/service-accounts';
import { Injectable } from '@nestjs/common';
import { Organization } from '../organizations/organization.entity';
import { User } from '../users/user.entity';
import { UserToRole } from '../user-to-roles/user-to-role.entity';

@Injectable()
export  class ServiceAccountsService extends BaseServiceAccountsService<User, UserToRole, Organization> {
  generateEntityId() {
    return this.idService.generateEntityId('sa', 'hc');
  }
}
