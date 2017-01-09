import axios from 'axios';
import HTTP from 'http-status-codes';

import { addMemberUrl, ownProfileUrl } from '../api';
import { logoutUser } from '../auth/actions';
import * as types from './types';

/*
 * Handle profile errors here
 */
function handleError(dispatch, error) {
  const { response } = error;
  // If we have a response, then the request reached the server and
  // was denied for some reason.
  if (response) {
    console.error(response);
    switch (error.status) {
      // HTTP 401 means the user simply isn't logged in; as usual we
      // can treat this by just logging the user out.
      case HTTP.UNAUTHORIZED:
        return logoutUser()(dispatch);
      default:
    }
  } else {
    // No response means a client error: the request never reached the
    // server. Handle accordingly.
    console.error(error);
  }
}

/*
 * POST user details to the API server
 * and handle the response
 */
function addMember(user) {
  return (dispatch) => {
    const url = addMemberUrl();
    console.info('user info:');
    console.info(user);
    axios.post(url, user)
    .then((response) => {
      const data = response.data;
      // What to do with the data?
    })
    .catch((error) => {
      console.error(error);
    });
  };
}

/*
 * Retrieve the user's profile information.
 */
function fetchProfile() {
  return (dispatch) => {
    // Make a GET request to the API server's own-profile URL
    // and handle the response
    const url = ownProfileUrl();
    axios.get(url)
    .then((response) => {
      // If we're here, then the server responded with a 2xx and we should have
      // the profile data; dispatch an event
      const profile = response.data;
      dispatch({ type: types.PROFILE_RECEIVED, payload: profile });
    })
    .catch((error) => {
      // If we're here, then the server responded with an error of some sort;
      // let the error handler take care of it
      handleError(dispatch, error);
    });
  };
}

export {
  addMember,
  fetchProfile,
};
