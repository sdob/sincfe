import { createApiAction } from '../api';
import { certificateListUrl, courseDetailUrl, coursesListUrl } from '../api/urls';
import {
  certificateList,
  courseAdd,
  courseDetail,
  courseList,
} from './types';


const addCourse = data => createApiAction({
  data,
  url: coursesListUrl(),
  method: 'post',
  types: courseAdd,
});

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

export {
  addCourse,
  fetchCertificateList,
  fetchCourseDetail,
  fetchCourseList,
};
