
import { USE_PERMISSION_KEY } from '@deeepvision/nest-kit';
import { SetMetadata } from '@nestjs/common';
import { Permission } from './registry';

export const UsePermission = (permission: Permission) => SetMetadata(USE_PERMISSION_KEY, permission);
