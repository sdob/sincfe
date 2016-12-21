import axios from 'axios';
import { regionsListUrl } from '../api';
import { REGIONS_RECEIVED } from './types';

function fetchRegions() {
  return function fetch(dispatch) {
    axios.get(regionsListUrl())
    .then((response) => {
      console.log('dispatching');
      dispatch({ type: REGIONS_RECEIVED, payload: response.data });
    })
    .catch((error) => {
      console.error(error);
    });
  };
}

export default fetchRegions;
