import * as types from './types';

/*
 * Handle profile-related actions here
 */

export default function authReducer(state = {}, action) {
  switch (action.type) {
    case types.PROFILE_RECEIVED:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
}

