import axios from 'axios';
import cookie from 'react-cookie';
// import STATUS_CODES from 'http';
import HTTP from 'http-status-codes';
import * as types from './types';
import { API_LOGIN_URL, API_PROFILE_URL } from '../constants';

export {
  fetchProfile,
  loginUser,
  logoutUser,
};


/*
 * Handle all authentication errors in this function.
 */
function handleError(dispatch, error) {
  if (error.response) {
    const { status } = error.response;
    switch (status) {
      // If the server responded with an HTTP 401, that means that
      // the user is unauthenticated (possibly with a stale token),
      // so we can easily handle that here
      case HTTP.UNAUTHORIZED:
        // We can treat this exactly as if the user were logging out
        logoutUser();
        return;

      // HTTP 400 means that the user/password combination is wrong;
      // just dispatch the error
      case HTTP.BAD_REQUEST:
        dispatch({ type: types.LOGIN_FAILURE, payload: error.response });
        break;
      default:
    }
    // Other status codes should be passed to the reducer
  }
}

function loginUser({ username, password }) {
  return (dispatch) => {
    axios.post(API_LOGIN_URL, { username, password })
    .then((response) => {
      // Store the authentication token
      cookie.save('token', response.data.token, { path: '/' });
      window.location.href = '/main';
      // Set default header
      axios.defaults.headers.common.Authorization = `Token ${response.data.token}`;
      // Dispatch the login success event
      dispatch({ type: types.LOGIN_SUCCESS });
    })
    .catch((error) => {
      handleError(dispatch, error);
    });
  };
}

function fetchProfile() {
  return (dispatch) => {
    axios.get(API_PROFILE_URL)
    .then((response) => {
      console.info('profile returned');
      console.info(response.data);
      const profile = response.data;
      dispatch({ type: types.PROFILE_RECEIVED, payload: profile });
      // Don't save the user info in a cookie;
      // TODO: have some better cookie management
      // cookie.save(`user`, user);
    })
    .catch((error) => {
      handleError(error);
    });
  };
}

function logoutUser() {
  return (dispatch) => {
    // Remove the token from the cookie store
    cookie.remove('token');
    // Remove the default header
    delete axios.defaults.headers.common.Authorization;
    dispatch({ type: types.LOGOUT_USER });
    window.location.href = '/main';
  };
}
