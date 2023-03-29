import { Permission } from '@/permissions/registry';
import { UsePermission as DVUsePermission } from '@deeepvision/nest-kit';

export const USE_PERMISSION_KEY = Symbol('USE_PERMISSION_KEY');
export const UsePermission = (permission: Permission) => DVUsePermission(permission);
