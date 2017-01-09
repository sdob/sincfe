import * as types from './types';

export default function coursesReducer(state = { hiddenRegions: [] }, action) {
  switch (action.type) {
    case types.CERTIFICATE_LIST_RECEIVED:
      return { ...state, certificates: action.payload };
    case types.COURSE_DETAIL_RECEIVED:
      return { ...state, course: action.payload };
    case types.COURSE_LIST_RECEIVED:
      return { ...state, courses: action.payload };
    case types.REGION_HIDE:
      {
        const hiddenRegions = [...state.hiddenRegions, action.payload.id];
        return { ...state, hiddenRegions };
      }
    case types.REGION_SHOW:
      {
        const hiddenRegions = (state.hiddenRegions || []).filter(x => x !== action.payload.id);
        return { ...state, hiddenRegions };
      }
    default:
      return state;
  }
}
