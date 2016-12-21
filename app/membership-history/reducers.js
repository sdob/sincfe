import * as types from './types';

function currentMembershipStatusReducer(state = {}, action) {
  switch (action.type) {
    case types.CMS_RECEIVED:
      return { ...state, currentMembershipStatus: action.payload };
    default:
      return state;
  }
}

export default currentMembershipStatusReducer;
