import { BaseUsersService } from '@deeepvision/nest-kit/dist/modules/users';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserToRole } from '../user-to-roles/user-to-role.entity';
import { User } from './user.entity';

export class UsersService extends BaseUsersService<User, UserToRole> {
  constructor(
    @InjectRepository(User) protected readonly userRepository: Repository<User>,
    @InjectRepository(UserToRole) protected readonly userToRoleRepository: Repository<UserToRole>,
  ) {
    super(
      userRepository,
      userToRoleRepository,
    );
  }
}
