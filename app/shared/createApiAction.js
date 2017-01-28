import axios from 'axios';
import http from 'http-status-codes';
import logoutUser from '../auth/actions';

/*
 * This is a factory method that creates Redux actions that contact the
 * API (since a lot of the behaviour is shared between actions). Pass
 * in an object containing the following:
 * url: the URL of the endpoint,
 * method: 'get', 'post', etc.,
 * types: an object containing events to be dispatched, in the format
 *    { pending: <string>, success: <string>, error: <string> },
 * formatRequest (optional): a function that transforms the request data
 *    before it's sent,
 * formatResponse (optional): a function that transforms the response data
 *    when it's received but before we dispatch it to the reducers.
 */
export default function createApiAction({
  url,
  method,
  types,
  data,
  formatRequest,
  formatResponse,
}) {
  const { pending, success, error } = types;
  // TODO: It seems like it ought to be possible to declare these identity
  // functions as default parameters, but I can't get that to work.
  // const formatRequest_ = formatRequest || function format(x) { return x; };
  // const formatResponse_ = formatResponse || function format(x) { return x; };
  const identity = x => x;
  return (dispatch) => {
    dispatch({ type: pending });
    return axios[method](url, (formatRequest || identity)(data))
    .then((formatResponse || identity))
    .then((response) => {
      dispatch({ type: success, payload: response.data });
      return response.data;
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
  };
}
