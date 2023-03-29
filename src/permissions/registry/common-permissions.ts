export const commonUsersPermissions = [
  'nst:core:users:get-me',
  'nst:core:binary-files:get',
  'nst:core:binary-files:create',
  'nst:core:binary-files:update',
  'nst:core:images:get',
  'nst:core:images:create',
  'nst:core:images:update',
  'nst:core:countries:list',
  'nst:core:timezones:list',
  'nst:core:languages:list',
  'nst:core:countries:list',

  'nst:core:auth-n:create-password-recovery-request',
  'nst:core:auth-n:verify-password-recovery-token',
  'nst:core:auth-n:recover-password',
  'nst:core:organizations:get',
];

export const commonAuthorizedUsersPermissions = [
  'nst:core:users[my]:change-password',
  'nst:core:users[my]:update',
  'nst:organizations[my]:list',
  'nst:core:users[org]:list',
  'nst:core:roles[org]:list',
];
