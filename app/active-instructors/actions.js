import axios from 'axios';

import { ACTIVE_INSTRUCTORS_RECEIVED } from './types';
import { activeInstructorsUrl } from '../api';

export default function fetchActiveInstructors() {
  return function fetch(dispatch) {
    const url = activeInstructorsUrl();
    console.info(`fetching from ${url}`);
    axios.get(url)
    .then((response) => {
      console.info('active instructors received AJAX');
      const instructors = response.data;
      dispatch({ type: ACTIVE_INSTRUCTORS_RECEIVED, payload: instructors });
    })
    .catch((error) => {
      console.error(error);
    });
  };
}
