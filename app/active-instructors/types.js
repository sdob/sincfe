import { createTypes } from '../shared';

// export const ACTIVE_INSTRUCTORS_RECEIVED = 'ACTIVE_INSTRUCTORS_RECEIVED';
// export const ACTIVE_INSTRUCTORS_ERROR = 'ACTIVE_INSTRUCTORS_ERROR';

const clubActiveInstructorList = createTypes('CLUB_ACTIVE_INSTRUCTOR_LIST');
const regionActiveInstructorList = createTypes('REGION_ACTIVE_INSTRUCTOR_LIST');

export {
  clubActiveInstructorList,
  regionActiveInstructorList,
};
