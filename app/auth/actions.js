import axios from 'axios';
import cookie from 'react-cookie';
// import STATUS_CODES from 'http';
import HTTP from 'http-status-codes';
import * as types from './types';
import { loginUrl } from '../api';

export {
  loginUser,
  logoutUser,
};


/*
 * Handle all authentication errors in this function.
 */
function handleError(dispatch, error) {
  if (error.response) {
    // If we have a response from the server, then there should be a
    // status code that will tell us what went wrong
    const { status } = error.response;
    switch (status) {
      // If the server responded with HTTP 401, that means that
      // the user is unauthenticated (possibly with a stale token),
      // so we can easily handle that here. (The UI should never
      // allow a good-faith user to send a request when unauthorized,
      // but it can happen if the server rotates tokens without
      // notifying the user while they're logged in.)
      case HTTP.UNAUTHORIZED:
        // We can treat this exactly as if the user were logging out
        logoutUser()(dispatch);
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

/*
 * Try to log the user in with a username and password.
 */
function loginUser({ username, password }) {
  return (dispatch) => {
    // Post the username/password combination to the API server's login URL
    // and handle the response
    const url = loginUrl();
    axios.post(url, { username, password })
    .then((response) => {
      // If we're here, then the server responded with a 2xx response and a
      // token. Start by storing the authentication token as a cookie
      cookie.save('token', response.data.token, { path: '/' });
      // Redirect to the main page
      window.location.href = '/';
      // Set the authorization header for all outgoing requests
      axios.defaults.headers.common.Authorization = `Token ${response.data.token}`;
      // Dispatch the login success event
      dispatch({ type: types.LOGIN_SUCCESS });
    })
    .catch((error) => {
      // If we're here, then the server responded with an error of some sort
      // (4xx or 5xx). Let our error handler take care of it
      handleError(dispatch, error);
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
