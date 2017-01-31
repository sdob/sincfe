import {
  certificateList,
  courseDetail,
  courseList,
  REGION_HIDE,
  REGION_SHOW,
} from './types';

export default function coursesReducer(state = { hiddenRegions: [] }, action) {
  switch (action.type) {
    case certificateList.success:
      return { ...state, certificates: action.payload };
    case courseDetail.success:
      return { ...state, course: action.payload };
    case courseList.success:
      return { ...state, courses: action.payload };
    case REGION_HIDE:
      {
        const hiddenRegions = [...state.hiddenRegions, action.payload.id];
        return { ...state, hiddenRegions };
      }
    case REGION_SHOW:
      {
        const hiddenRegions = (state.hiddenRegions || []).filter(x => x !== action.payload.id);
        return { ...state, hiddenRegions };
      }
    default:
      return state;
  }
}
