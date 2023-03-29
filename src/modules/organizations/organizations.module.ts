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
    OrganizationsResolver,
  ],
  exports: [
    OrganizationsService,
    TypeOrmModule,
  ],
})
export class OrganizationsModule {}
