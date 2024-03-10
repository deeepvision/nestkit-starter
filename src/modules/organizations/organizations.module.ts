import { ORGANIZATIONS_SERVICE_TOKEN } from '@deeepvision/nest-kit/dist/modules/organizations';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImagesModule } from '../images/images.module';
import { TimezonesModule } from '../timezones/timezones.module';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { Organization } from './organization.entity';
import { OrganizationsResolver } from './organizations.resolver';
import { OrganizationsService } from './organizations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization, Organization, UserToRole]),
    ImagesModule,
    TimezonesModule,
  ],
  providers: [
    OrganizationsService,
    {
      provide: ORGANIZATIONS_SERVICE_TOKEN,
      useExisting: OrganizationsService,
    },
    OrganizationsResolver,
  ],
  exports: [
    OrganizationsService,
    {
      provide: ORGANIZATIONS_SERVICE_TOKEN,
      useExisting: OrganizationsService,
    },
    TypeOrmModule,
  ],
})
export class OrganizationsModule {}
