import axios from 'axios';
import { regionsListUrl } from '../api';
import { REGIONS_ERROR, REGIONS_RECEIVED } from './types';

function handleError(dispatch, error) {
  // TODO: implement proper error-handling here.
  return dispatch({ type: REGIONS_ERROR, payload: error });
}

function fetchRegions() {
  return function fetch(dispatch) {
    axios.get(regionsListUrl())
    .then((response) => {
      dispatch({ type: REGIONS_RECEIVED, payload: response.data });
    })
    .catch((error) => {
      // There's been an error (4xx or 5xx); let the error handler
      // take care of it
      handleError(dispatch, error);
    });
  };
}

export default fetchRegions;
