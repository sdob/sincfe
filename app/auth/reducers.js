import * as types from './types';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false };

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: // User successfully logged in
      return { ...state, error: '', message: '', authenticated: true };
    case types.LOGOUT_SUCCESS: // User successfully logged out
      return { ...state, authenticated: false };
    case types.LOGIN_FAILURE: // There was a problem logging in
      return { ...state, error: action.payload };
    case types.PROFILE_RECEIVED: // The user's info was successfully received
      console.log('profile received!');
      return { ...state, profile: action.payload };
    default:
      return state;
  }
}

export default authReducer;
