import {
  certificateList,
  courseAdd,
  courseDetail,
  courseList,
  memberCoursesOrganizedList,
  REGION_HIDE,
  REGION_SHOW,
} from './types';

export default function coursesReducer(initialState = {}, action) {
  const state = { ...initialState, added: false };
  switch (action.type) {
    case certificateList.success:
      return { ...state, certificates: action.payload };
    case courseAdd.success:
      return {...state, added: true };
    case courseDetail.success:
      return { ...state, course: action.payload };
    case courseList.success:
      return { ...state, courses: action.payload };
    case memberCoursesOrganizedList.success:
      return { ...state, courses: action.payload };
    default:
      return state;
  }
}
