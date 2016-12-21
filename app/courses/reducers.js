import * as types from './types';

export default function coursesReducer(state = {}, action) {
  switch (action.type) {
    case types.COURSES_RECEIVED:
      return { ...state, courses: action.payload };
    default:
      return state;
  }
}
