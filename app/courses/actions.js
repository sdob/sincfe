import { createApiAction } from '../api';
import {
  certificateListUrl,
  courseDetailUrl,
  coursesListUrl,
  memberCoursesOrganizedListUrl,
} from '../api/urls';
import {
  certificateList,
  courseAdd,
  courseDetail,
  courseList,
  memberCoursesOrganizedList,
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

const fetchCoursesOrganized = uid => createApiAction({
  url: memberCoursesOrganizedListUrl(uid),
  method: 'get',
  types: memberCoursesOrganizedList,
});

export {
  addCourse,
  fetchCertificateList,
  fetchCourseDetail,
  fetchCourseList,
  fetchCoursesOrganized,
};
