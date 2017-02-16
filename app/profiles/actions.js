import { addMemberUrl, memberDetailUrl, memberListUrl, memberNameSearchUrl, ownProfileUrl } from '../api/urls';
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
  formatResponse: addMemberMethods,
});

const searchForMember = name => createApiAction({
  url: memberNameSearchUrl(name),
  method: 'get',
  types: memberList,
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
  // If we've been passed a Date object, then format it appropriately
  // for Django; otherwise, return the string
  const date_of_birth = (user.date_of_birth instanceof Date)
    ? date2django(user.date_of_birth)
    : user.date_of_birth;
  return { ...user, date_of_birth };
}

/* Add convenience methods for checking member properties */
function addMemberMethods(response) {
  const { data } = response;
  return {
    ...response,
    data: {
      ...data,
      isDiveOfficerOf: clubId => (
        data.club.id === clubId && data.readable_committee_positions.includes('Dive Officer')
      ),
    },
  };
}

export {
  addMember,
  fetchMember,
  fetchMembers,
  fetchProfile,
  searchForMember,
  updateMember,
  updateOwnProfile,
};
