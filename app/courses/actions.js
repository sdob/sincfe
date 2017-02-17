import { createApiAction } from '../api';

import {
  certificateListUrl,
  courseDetailUrl,
  courseInstructionDetailUrl,
  courseInstructionListUrl,
  coursesListUrl,
  memberCoursesOrganizedListUrl,
} from '../api/urls';

import {
  certificateList,
  courseAdd,
  courseDelete,
  courseDetail,
  courseInstructionAdd,
  courseInstructionDelete,
  courseInstructionList,
  courseList,
  courseUpdate,
  memberCoursesOrganizedList,
} from './types';

const addCourse = data => createApiAction({
  data,
  url: coursesListUrl(),
  method: 'post',
  types: courseAdd,
  formatRequest: formatCoursePostData,
});

const addCourseInstruction = (cid, data) => createApiAction({
  data,
  url: courseInstructionListUrl(cid),
  method: 'post',
  types: courseInstructionAdd,
});

const deleteCourse = cid => createApiAction({
  url: courseDetailUrl(cid),
  method: 'delete',
  types: courseDelete,
});

const deleteCourseInstruction = (courseId, instructionId) => createApiAction({
  method: 'delete',
  url: courseInstructionDetailUrl(courseId, instructionId),
  types: courseInstructionDelete,
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

const fetchCourseInstructionList = cid => createApiAction({
  url: courseInstructionListUrl(cid),
  method: 'get',
  types: courseInstructionList,
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

const updateCourse = data => createApiAction({
  data,
  url: courseDetailUrl(data.id),
  method: 'put',
  types: courseUpdate,
  formatRequest: formatCoursePostData,
});

function formatCoursePostData(data) {
  const { organizer } = data;
  return {
    ...data,
    organizer: organizer ? organizer.id : null,
  };
}

export {
  addCourse,
  addCourseInstruction,
  deleteCourse,
  deleteCourseInstruction,
  fetchCertificateList,
  fetchCourseDetail,
  fetchCourseInstructionList,
  fetchCourseList,
  fetchCoursesOrganized,
  updateCourse,
};
