// src/modules/users/user.entity.ts

import { BaseUser } from '@deeepvision/nest-kit/dist/modules/users';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity } from 'typeorm';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
@ObjectType()
@ChildEntity()
export class User extends BaseUser {
  @Field(() => [UserToRole])
  userToRoles!: Promise<UserToRole[]>;
}
