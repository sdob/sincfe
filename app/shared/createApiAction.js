import axios from 'axios';
import http from 'http-status-codes';
import logoutUser from '../auth/actions';

/*
 * This is a factory method that creates Redux actions that contact the
 * API (since a lot of the behaviour is shared between actions). Pass
 * it a URL, a method ('get', 'post', etc.), an 'types' object, and
 * (optionally) form data to be sent.
 *
 * The 'types' object should have 'pending', 'success', and 'error'
 * keys, which will be dispatched, respectively,
 * (1) when the API call is sent;
 * (2) when a successful response is returned; and
 * (3) when an error is returned.
 *
 * The returned action will handle HTTP 401 Unauthorized errors
 * automatically, since this type of error is a special case that
 * just requires us to log the user out.
 */
export default function createApiAction(url, method, types, data) {
  const { pending, success, error } = types;
  return (dispatch) => {
    dispatch({ type: pending });
    return axios[method](url, data)
    .then((response) => {
      const { data } = response;
      dispatch({ type: success, payload: data });
    })
    .catch((err) => {
      // Special case: HTTP 401 Unauthorized. This should happen very
      // rarely but if, for example, the authentication tokens are
      // refreshed on the server, we'll find out here.
      if (err.status === http.UNAUTHORIZED) {
        return logoutUser();
      }
      dispatch({ type: error, error: err });
      throw err;
    });
  }
}
