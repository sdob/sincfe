import { createTypes } from '../shared';

export const OWN_PROFILE_RECEIVED = 'OWN_PROFILE_RECEIVED';
export const OWN_PROFILE_FETCHING = 'OWN_PROFILE_FETCHING';
export const OWN_PROFILE_ERROR = 'OWN_PROFILE_ERROR';

export const PROFILE_CREATE_SENDING = 'PROFILE_CREATE_SENDING';
export const PROFILE_CREATE_SUCCESS = 'PROFILE_CREATE_SUCCESS';
export const PROFILE_CREATE_ERROR = 'PROFILE_CREATE_ERROR';

export const PROFILE_UPDATE_SENDING = 'PROFILE_UPDATE_SENDING';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_ERROR = 'PROFILE_UPDATE_ERROR';

export const MEMBER_DETAIL_FETCHING = 'MEMBER_DETAIL_FETCHING';
export const MEMBER_DETAIL_RECEIVED = 'MEMBER_DETAIL_RECEIVED';
export const MEMBER_DETAIL_ERROR = 'MEMBER_DETAIL_ERROR';

export const MEMBER_LIST_FETCHING = 'MEMBER_LIST_FETCHING';
export const MEMBER_LIST_RECEIVED = 'MEMBER_LIST_RECEIVED';
export const MEMBER_LIST_ERROR = 'MEMBER_LIST_ERROR';

export const UPDATE_MEMBER_SENDING = 'UPDATE_MEMBER_SENDING';
export const UPDATE_MEMBER_SUCCESS = 'UPDATE_MEMBER_SUCCESS';
export const UPDATE_MEMBER_ERROR = 'UPDATE_MEMBER_ERROR';

const memberCreate = createTypes('MEMBER_CREATE');
const memberDelete = createTypes('MEMBER_DELETE');
const memberDetail = createTypes('MEMBER_DETAIL');
const memberList = createTypes('MEMBER_LIST');
const ownProfileRetrieve = createTypes('OWN_PROFILE_RETRIEVE');
const memberUpdate = createTypes('UPDATE_MEMBER');
const ownProfileUpdate = createTypes('OWN_PROFILE_UPDATE');

export {
  memberCreate,
  memberDelete,
  memberDetail,
  memberList,
  memberUpdate,
  ownProfileRetrieve,
  ownProfileUpdate,
};
