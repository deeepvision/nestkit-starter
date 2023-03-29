import { MaybeNull } from '@deeepvision/nest-kit';
import { BaseOrganizationGroup } from '@deeepvision/nest-kit/dist/modules/organization-groups';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity } from 'typeorm';
import { Image } from '../images/image.entity';
import { Organization } from '../organizations/organization.entity';
import { User } from '../users/user.entity';

@ObjectType()
@ChildEntity()
export class OrganizationGroup extends BaseOrganizationGroup {
  @Field(() => User, {
    nullable: true,
  })
  creator!: Promise<MaybeNull<User>>;

  @Field(() => Image, {
    nullable: true,
  })
  logo!: Promise<MaybeNull<Image>>;

  @Field(() => [Organization])
  organizations!: Promise<Organization[]>;
}
