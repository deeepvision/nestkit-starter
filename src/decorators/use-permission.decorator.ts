import { UsePermission as DVUsePermission } from '@deeepvision/nest-kit';

import { Permission } from '@/permissions';

export const UsePermission = (permission: Permission) => DVUsePermission(permission);
