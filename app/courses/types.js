import { createTypes } from '../shared';

const certificateList = createTypes('CERTIFICATE_LIST');
const courseAdd = createTypes('COURSE_ADD');
const courseDetail = createTypes('COURSE_DETAIL');
const courseList = createTypes('COURSE_LIST');
const memberCoursesOrganizedList = createTypes('MEMBER_COURSES_ORGANIZED');

export {
  certificateList,
  courseAdd,
  courseDetail,
  courseList,
  memberCoursesOrganizedList,
};
