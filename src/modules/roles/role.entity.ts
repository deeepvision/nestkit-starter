
import { Field, ObjectType } from '@nestjs/graphql';
import { MaybeNull } from '@deeepvision/nest-kit';
import { BaseRole } from '@deeepvision/nest-kit/dist/modules/roles/role.entity';
import { ChildEntity } from 'typeorm';

import { Organization } from '../organizations/organization.entity';
import { UserToRole } from '../user-to-roles/user-to-role.entity';

@ObjectType()
@ChildEntity()
export class Role extends BaseRole {
  @Field(() => Organization, {
    nullable: true,
  })
  organization!: Promise<MaybeNull<Organization>>;

  userToRoles!: Promise<UserToRole[]>;
}
