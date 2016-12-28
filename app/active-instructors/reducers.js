import * as types from './types';

export default function activeInstructorsReducer(state = {}, action) {
  switch (action.type) {
    case types.ACTIVE_INSTRUCTORS_RECEIVED:
      return { ...state, instructors: action.payload };
    default:
      return state;
  }
}
