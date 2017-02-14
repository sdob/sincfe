import * as roles from './profile-role-types';

function isAdministrator(profile) {
  return profile && !!profile.is_staff;
}
export {
  isAdministrator,
};
