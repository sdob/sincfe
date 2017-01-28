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

const memberCreate = {
  pending: PROFILE_CREATE_SENDING,
  success: PROFILE_CREATE_SUCCESS,
  error: PROFILE_CREATE_ERROR,
};

const memberDetail = {
  pending: MEMBER_DETAIL_FETCHING,
  success: MEMBER_DETAIL_RECEIVED,
  error: MEMBER_LIST_ERROR,
};

const memberList = {
  pending: MEMBER_LIST_FETCHING,
  success: MEMBER_LIST_RECEIVED,
  error: MEMBER_LIST_ERROR,
};

const ownProfileRetrieve = {
  pending: OWN_PROFILE_FETCHING,
  success: OWN_PROFILE_RECEIVED,
  error: OWN_PROFILE_ERROR,
};

const memberUpdate = {
  pending: 'UPDATE_MEMBER_SENDING',
  success: 'UPDATE_MEMBER_SUCCESS',
  error: 'UPDATE_MEMBER_ERROR',
};

const ownProfileUpdate = {
  pending: PROFILE_UPDATE_SENDING,
  success: PROFILE_UPDATE_SUCCESS,
  error: PROFILE_UPDATE_ERROR,
};

export {
  memberCreate,
  memberDetail,
  memberList,
  memberUpdate,
  ownProfileRetrieve,
  ownProfileUpdate,
};
