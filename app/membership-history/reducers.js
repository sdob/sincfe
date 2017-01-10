import * as types from './types';

function currentMembershipStatusReducer(state = {}, action) {
  switch (action.type) {
    case types.MEMBERSHIP_STATUS_RECEIVED:
      return { ...state, currentStatus: action.payload };
    case types.MEMBERSHIP_STATUS_ERROR:
      return { ...state, errorMsg: action.payload };
    default:
      return state;
  }
}

export default currentMembershipStatusReducer;
