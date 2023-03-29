import { MaybeNull } from '@deeepvision/nest-kit';
import { BaseOrganization } from '@deeepvision/nest-kit/dist/modules/organizations';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity } from 'typeorm';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { Image } from '../images/image.entity';
import { OrganizationGroup } from '../organization-groups/organization-group.entity';
import { Role } from '../roles/role.entity';
import { User } from '../users/user.entity';

@ObjectType()
@ChildEntity()
export class Organization extends BaseOrganization {
  @Field(() => User, {
    nullable: true,
  })
  creator!: Promise<MaybeNull<User>>;

  @Field(() => OrganizationGroup, {
    nullable: true,
  })
  group!: Promise<OrganizationGroup>;

  @Field(() => Image, {
    nullable: true,
    description: 'The organization logo',
  })
  logo!: Promise<MaybeNull<Image>>;

  userToRoles!: Promise<UserToRole[]>;

  roles!: Promise<Role[]>;
}

