import axios from 'axios';
import HTTP from 'http-status-codes';

import { addMemberUrl } from '../api';
import { logoutUser } from '../auth/actions';

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

export {
  addMember,
};
