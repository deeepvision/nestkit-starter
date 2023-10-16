import { Permission } from '@/permissions';
import { UsePermission as DVUsePermission } from '@deeepvision/nest-kit';
export const UsePermission = (permission: Permission) => DVUsePermission(permission);
