import axios from 'axios';

import { qualificationsUrl } from '../api';
import { QUALIFICATIONS_RECEIVED } from './types';

function fetchQualifications(uid) {
  return function fetch(dispatch) {
    const url = qualificationsUrl(uid);
    axios.get(url)
    .then((response) => {
      const qualifications = response.data;
      dispatch({ type: QUALIFICATIONS_RECEIVED, payload: qualifications });
    })
    .catch((error) => {
      console.error('Error retrieving qualifications');
      console.error(error);
    });
  };
}

export default fetchQualifications;
