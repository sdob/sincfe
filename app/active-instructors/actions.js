import axios from 'axios';

import { ACTIVE_INSTRUCTORS_RECEIVED } from './types';
import { activeInstructorListUrl } from '../api';

export default function fetchActiveInstructors(rid) {
  return function fetch(dispatch) {
    const url = activeInstructorListUrl(rid);
    axios.get(url)
    .then((response) => {
      const instructors = response.data;
      dispatch({ type: ACTIVE_INSTRUCTORS_RECEIVED, payload: instructors });
    })
    .catch((error) => {
      console.error(error);
    });
  };
}
