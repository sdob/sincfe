import {
  certificateList,
  courseAdd,
  courseDetail,
  courseList,
  REGION_HIDE,
  REGION_SHOW,
} from './types';

export default function coursesReducer(state = { hiddenRegions: [] }, action) {
  switch (action.type) {
    case certificateList.success:
      return { ...state, certificates: action.payload };
    case courseAdd.success:
      return {...state, added: true };
    case courseDetail.success:
      return { ...state, course: action.payload };
    case courseList.success:
      return { ...state, courses: action.payload };
    default:
      return state;
  }
}
