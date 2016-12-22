import * as types from './types';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false };

/*
 * Handle authentication-related actions here.
 */
function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // LOGIN_SUCCESS means that the user has successfully logged in;
    // set state.authenticated to true
    case types.LOGIN_SUCCESS:
      return { ...state, error: '', message: '', authenticated: true };

    // LOGOUT_SUCCESS means that the user has successfully logged out;
    // set state.authenticated to false
    case types.LOGOUT_SUCCESS:
      return { ...state, authenticated: false };

    // LOGIN_FAILURE means that there was a problem logging the user in
    // (user error or server error); add the error to state
    case types.LOGIN_FAILURE:
      return { ...state, error: action.payload };

    // PROFILE_RECEIVED means that the user's profile info was successfully
    // received; add it to state
    case types.PROFILE_RECEIVED: // The user's info was successfully received
      console.log('profile received!');
      return { ...state, profile: action.payload };

    // Default case: just return the state as-is
    default:
      return state;
  }
}

export default authReducer;
