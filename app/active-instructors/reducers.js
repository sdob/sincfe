import {
  regionActiveInstructorList,
} from './types';

export default function activeInstructorsReducer(state = {}, action) {
  switch (action.type) {
    case regionActiveInstructorList.success:
      return { ...state, instructors: action.payload };
    default:
      return state;
  }
}
