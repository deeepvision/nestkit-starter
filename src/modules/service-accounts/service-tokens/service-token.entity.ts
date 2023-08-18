import { BaseServiceToken } from '@deeepvision/nest-kit/dist/modules/service-accounts/service-tokens/service-token.entity';
import { ObjectType } from '@nestjs/graphql';
import { ChildEntity } from 'typeorm';

import { User } from '@/modules/users/user.entity';

@ObjectType()
@ChildEntity()
export class ServiceToken extends BaseServiceToken {
  user!: Promise<User>;
}
