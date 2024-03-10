import { MaybeNull } from '@deeepvision/nest-kit';
import { BaseUserToRole } from '@deeepvision/nest-kit/dist/modules/user-to-roles';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity } from 'typeorm';

import { Organization } from '@/modules/organizations/organization.entity';
import { Role } from '@/modules/roles/role.entity';
import { User } from '@/modules/users/user.entity';

@ObjectType()
@ChildEntity()
export class UserToRole extends BaseUserToRole {
  @Field(() => User)
  user!: Promise<User>;

  @Field(() => Organization, {
    nullable: true,
  })
  organization!: Promise<MaybeNull<Organization>>;

  @Field(() => Role)
  role!: Promise<Role>;

  @Field(() => User, {
    nullable: true,
  })
  grantedBy!: Promise<MaybeNull<User>>;
}
