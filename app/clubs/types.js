import { createTypes } from '../shared';

const clubAdd = createTypes('CLUB_ADD');
const clubDelete = createTypes('CLUB_DELETE');

const clubDetail = {
  success: 'CLUB_DETAIL_RECEIVED',
  pending: 'CLUB_DETAIL_FETCHING',
  error: 'CLUB_DETAIL_ERROR',
};

const clubList = {
  success: 'CLUB_LIST_RECEIVED',
  pending: 'CLUB_LIST_FETCHING',
  error: 'CLUB_LIST_ERROR',
};

const clubMemberList = {
  success: 'CLUB_MEMBER_LIST_RECEIVED',
  pending: 'CLUB_MEMBER_LIST_FETCHING',
  error: 'CLUB_MEMBER_LIST_ERROR',
};

const clubUpdate = {
  success: 'CLUB_UPDATE_SUCCESS',
  pending: 'CLUB_UPDATE_PENDING',
  error: 'CLUB_UPDATE_ERROR',
};

export {
  clubAdd,
  clubDelete,
  clubDetail,
  clubList,
  clubMemberList,
  clubUpdate,
};
