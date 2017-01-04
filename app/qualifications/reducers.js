import * as types from './types';

function qualificationsReducer(state = {}, action) {
  switch (action.type) {
    case types.MEMBER_QUALIFICATIONS_RECEIVED:
      return { ...state, qualifications: action.payload };
    case types.CLUB_QUALIFICATIONS_RECEIVED:
      return { ...state, qualifications: action.payload };
    case types.MEMBER_QUALIFICATIONS_ERROR:
    case types.CLUB_QUALIFICATIONS_ERROR:
    case types.GENERIC_QUALIFICATIONS_ERROR:
      return { ...state, errorMsg: action.payload };
    default:
      return state;
  }
}

export default qualificationsReducer;
