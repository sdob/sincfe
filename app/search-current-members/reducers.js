import * as types from './types';

function currentMembersReducer(state = {}, action) {
  switch (action.type) {
    case types.CURRENT_MEMBERS_RECEIVED:
      console.info('CURRENT MEMBERS RECEIVED');
      return { ...state, currentMembers: action.payload };
    default:
      return state;
  }
}

export default currentMembersReducer;
