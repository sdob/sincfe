import {
  certificateList,
  courseAdd,
  courseDetail,
  courseInstructionList,
  courseList,
  courseUpdate,
  memberCoursesOrganizedList,
} from './types';

export default function coursesReducer(initialState = {}, action) {
  const state = { ...initialState, added: false };
  switch (action.type) {
    case certificateList.success:
      return { ...state, certificates: action.payload };
    case courseAdd.success:
      return { ...state, added: true };
    case courseDetail.success:
      return { ...state, course: action.payload };
    case courseUpdate.success:
      return { ...state, course: action.payload };
    case courseInstructionList.success:
      return { ...state, courseInstructions: action.payload };
    case courseList.success:
      return { ...state, courses: action.payload };
    case memberCoursesOrganizedList.success:
      return { ...state, courses: action.payload };
    default:
      return state;
  }
}
