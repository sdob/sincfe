import { createTypes } from '../shared';

const certificateList = createTypes('CERTIFICATE_LIST');
const courseAdd = createTypes('COURSE_ADD');
const courseDetail = createTypes('COURSE_DETAIL');
const courseList = createTypes('COURSE_LIST');

export {
  certificateList,
  courseAdd,
  courseDetail,
  courseList,
};
