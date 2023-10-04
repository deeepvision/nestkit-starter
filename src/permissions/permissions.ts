export type Permission =

/* Users */
| 'nst:core:users:create'
| 'nst:core:users:list'
| 'nst:core:users:delete'
| 'nst:core:users:update'

| 'nst:core:auth-n:change-password'
| 'nst:core:auth-n:create-password-recovery-request'
| 'nst:core:auth-n:verify-password-recovery-token'
| 'nst:core:auth-n:recover-password'
| 'nst:core:auth-n:generate-tokens'

/* Roles */
| 'nst:core:roles:assign-superadmin'
| 'nst:core:roles:assign-system'
| 'nst:core:roles:assign-org'
| 'nst:core:roles:list'
| 'nst:core:roles:create'
| 'nst:core:roles:update'
| 'nst:core:roles:delete'

/* Permissions */
| 'nst:core:permissions:list-modules'

/* UserToRoles */
| 'nst:core:user-to-roles:list'

/* Service Account */
| 'nst:core:service-accounts:create'
| 'nst:core:service-accounts:update'
| 'nst:core:service-accounts:delete'
| 'nst:core:service-accounts:generate-access-token'

/* Organizations */
| 'nst:core:organizations:get'
| 'nst:core:organizations:list'
| 'nst:core:organizations:create'
| 'nst:core:organizations:update'
| 'nst:core:organizations:delete'

/* Binary Files */
| 'nst:core:binary-files:get'
| 'nst:core:binary-files:create'
| 'nst:core:binary-files:sync'
| 'nst:core:binary-files:update'
| 'nst:core:binary-files:delete'

/* Images */
| 'nst:core:images:get'
| 'nst:core:images:create'
| 'nst:core:images:sync'
| 'nst:core:images:update'
| 'nst:core:images:delete'

/* Countries */
| 'nst:core:countries:list'

/* Categories */
| 'nst:core:categories:list'

/* Books */
| 'nst:core:books:create'
| 'nst:core:books:list'
| 'nst:core:books:get'
| 'nst:core:books:delete'
| 'nst:core:books:update'
