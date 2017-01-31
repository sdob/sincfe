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
  // TODO: It seems like it ought to be possible to declare this identity
  // functions as a default parameter, but I can't get that to work.
  const identity = x => x;
  return (dispatch) => {
    dispatch({ type: pending });
    // (Optionally) format the request data before sending it, if we were
    // passed a function. If we weren't, just run the identity function.
    const formattedRequestData = (formatRequest || identity)(data);
    // Make the call to the API server
    return axios[method](url, formattedRequestData)
    // When we receive a response, format it before dispatching it
    .then((formatResponse || identity))
    // Dispatch the formatted response data and return it
    .then((response) => {
      dispatch({ type: success, payload: response.data });
      return response.data;
    })
    // Dispatch errors.
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
