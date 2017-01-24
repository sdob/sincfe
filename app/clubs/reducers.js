import * as types from './types';

export default function clubsReducer(initialState = {}, action) {
  const state = { ...initialState, sending: false };
  switch (action.type) {
    case types.CLUB_DETAIL_SENDING:
      return { ...state, sending: true };
    case types.CLUB_DETAIL_RECEIVED:
      return { ...state, club: action.payload };
    case types.CLUB_UPDATE_SUCCESS:
      return { ...state, club: action.payload };
    case types.MEMBER_LIST_RECEIVED:
      return { ...state, memberList: action.payload };
    case types.CLUB_LIST_RECEIVED:
      return { ...state, clubList: action.payload };
    default:
      return initialState;
  }
}
