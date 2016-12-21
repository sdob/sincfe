import axios from 'axios';
import * as types from './types';
import { coursesListUrl } from '../api';

function fetchCourses() {
  return function fetch(dispatch) {
    axios.get(coursesListUrl())
    .then((response) => {
      dispatch({ type: types.COURSES_RECEIVED, payload: response.data });
    })
    .catch((error) => {
      console.error(error);
    });
  };
}

export default fetchCourses;
