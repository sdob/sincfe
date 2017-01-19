import * as types from './types';

/*
 * Handle profile-related actions here
 */

export default function authReducer(initialState = {}, action) {
  // Usually, we want to make sure that 'sending' is false
  const state = { ...initialState, sending: false };
  switch (action.type) {
    case types.PROFILE_CREATE_SENDING:
      return { ...state, sending: true };
    case types.PROFILE_CREATE_ERROR:
      return { ...state, errorMsg: action.payload };
    case types.PROFILE_CREATE_SUCCESS:
      return { ...state, user: action.payload };
    case types.PROFILE_RECEIVED:
      return { ...state, profile: action.payload };
    // Profile updates
    case types.PROFILE_UPDATE_SENDING:
      return { ...state, sending: true };
    case types.PROFILE_UPDATE_SUCCESS:
      return { ...state, profile: action.payload };
    case types.PROFILE_UPDATE_ERROR:
      return { ...state, errorMsg: action.payload };
    default:
      return initialState;
  }
}

