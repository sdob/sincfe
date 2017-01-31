import { addMemberUrl, memberDetailUrl, memberListUrl, ownProfileUrl } from '../api/urls';
import { createApiAction } from '../api';
import { date2django } from '../shared/dateUtils';
import {
  memberCreate,
  memberDetail,
  memberList,
  memberUpdate,
  ownProfileRetrieve,
  ownProfileUpdate,
} from './types';

/* Create a new user. */
const addMember = user => createApiAction({
  url: addMemberUrl(),
  method: 'post',
  types: memberCreate,
  data: user,
  formatRequest: formatUserDOB,
});

/* Retrieve a user's profile by ID. */
const fetchMember = uid => createApiAction({
  url: memberDetailUrl(uid),
  method: 'get',
  types: memberDetail,
});

/* Retrieve all SINC members (which will be a *lot*, so use sparingly) */
const fetchMembers = () => createApiAction({
  url: memberListUrl(), method: 'get', types: memberList,
});

/* Retrieve the user's profile information. */
const fetchProfile = () => createApiAction({
  url: ownProfileUrl(),
  method: 'get',
  types: ownProfileRetrieve,
});

/* Update a user. Convert the Date object to a string that Django accepts before sending.  */
const updateMember = user => createApiAction({
  url: memberDetailUrl(user.id),
  method: 'patch',
  types: memberUpdate,
  data: user,
  formatRequest: formatUserDOB,
});

/* Update the user's own profile. */
const updateOwnProfile = user => createApiAction({
  url: memberDetailUrl(user.id),
  method: 'patch',
  types: ownProfileUpdate,
  data: user,
  formatRequest: formatUserDOB,
});

function formatUserDOB(user) {
  return { ...user, date_of_birth: date2django(user.date_of_birth) };
}

export {
  addMember,
  fetchMember,
  fetchMembers,
  fetchProfile,
  updateMember,
  updateOwnProfile,
};
