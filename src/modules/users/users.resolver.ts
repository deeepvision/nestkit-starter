import { BaseUsersResolver } from '@deeepvision/nest-kit/dist/modules/users';
import { Resolver } from '@nestjs/graphql';
import { Organization } from '../organizations/organization.entity';
import { User } from './user.entity';

@Resolver(() => User)
export class UsersResolver extends BaseUsersResolver(User, Organization) {}
