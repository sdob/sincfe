import * as types from './types';

function clubQualificationsReducer(state = {}, action) {
  switch (action.type) {
    case types.CLUB_QUALIFICATIONS_RECEIVED:
      return { ...state, qualifications: action.payload };
    default:
      return state;
  }
}

export default clubQualificationsReducer;
