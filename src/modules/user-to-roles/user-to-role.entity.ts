import { ChildEntity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@/modules/users/user.entity';
import { BaseUserToRole } from '@deeepvision/nest-kit/dist/modules/user-to-roles';
import { Organization } from '@/modules/organizations/organization.entity';
import { Role } from '@/modules/roles/role.entity';
import { MaybeNull } from '@deeepvision/nest-kit';

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
