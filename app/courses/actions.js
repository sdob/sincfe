import { createApiAction } from '../api';
import { certificateListUrl, courseDetailUrl, coursesListUrl } from '../api/urls';
import {
  certificateList,
  courseDetail,
  courseList,
} from './types';

const fetchCertificateList = () => createApiAction({
  url: certificateListUrl(),
  method: 'get',
  types: certificateList,
});

const fetchCourseDetail = cid => createApiAction({
  url: courseDetailUrl(cid),
  method: 'get',
  types: courseDetail,
});

const fetchCourseList = () => createApiAction({
  url: coursesListUrl(),
  method: 'get',
  types: courseList,
});

function hideRegion(region) {
  console.info(`hiding region ID ${region.id}`);
  return function hide(dispatch) {
    dispatch({ type: types.REGION_HIDE, payload: region });
  };
}

function showRegion(region) {
  return function show(dispatch) {
    dispatch({ type: types.REGION_SHOW, payload: region });
  };
}

export {
  fetchCertificateList,
  fetchCourseDetail,
  fetchCourseList,
  hideRegion,
  showRegion,
};
