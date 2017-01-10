import * as types from './types';

/*
 * Handle profile-related actions here
 */

export default function authReducer(state = {}, action) {
  switch (action.type) {
    case types.PROFILE_CREATE_SENDING:
      return { ...state, sending: true };
    case types.PROFILE_CREATE_ERROR:
      return { ...state, errorMsg: action.payload, sending: false };
    case types.PROFILE_CREATE_SUCCESS:
      return { ...state, user: action.payload, sending: false };
    case types.PROFILE_RECEIVED:
      return { ...state, profile: action.payload, sending: false };
    default:
      return state;
  }
}

