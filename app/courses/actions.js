import axios from 'axios';
import * as types from './types';
import { courseDetailUrl, coursesListUrl } from '../api';

function fetchCourseDetail(cid) {
  return function fetch(dispatch) {
    axios.get(courseDetailUrl(cid))
    .then((response) => {
      dispatch({ type: types.COURSE_DETAIL_RECEIVED, payload: response.data });
    })
    .catch((error) => {
      handleError(dispatch, error);
    });
  }
}

function fetchCourseList() {
  return function fetch(dispatch) {
    axios.get(coursesListUrl())
    .then((response) => {
      dispatch({ type: types.COURSE_LIST_RECEIVED, payload: response.data });
    })
    .catch((error) => {
      handleError(dispatch, error);
    });
  };
}

function hideRegion(region) {
  console.info(`hiding region ID ${region.id}`);
  return function hide(dispatch) {
    dispatch({ type: types.REGION_HIDE, payload: region });
  }
}

function showRegion(region) {
  return function show(dispatch) {
    dispatch({ type: types.REGION_SHOW, payload: region });
  }
}

function handleError(dispatch, error) {
  console.error(error);
}

export {
  fetchCourseDetail,
  fetchCourseList,
  hideRegion,
  showRegion,
};
