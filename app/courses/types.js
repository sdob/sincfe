import { createTypes } from '../shared';

const certificateList = createTypes('CERTIFICATE_LIST');
const courseAdd = createTypes('COURSE_ADD');
const courseDelete = createTypes('COURSE_DELETE');
const courseDetail = createTypes('COURSE_DETAIL');
const courseList = createTypes('COURSE_LIST');
const courseUpdate = createTypes('COURSE_UPDATE');
const memberCoursesOrganizedList = createTypes('MEMBER_COURSES_ORGANIZED');

export {
  certificateList,
  courseAdd,
  courseDelete,
  courseDetail,
  courseList,
  courseUpdate,
  memberCoursesOrganizedList,
};
