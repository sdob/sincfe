import * as types from './types';

function qualificationsReducer(state = {}, action) {
  switch (action.type) {
    case types.QUALIFICATIONS_RECEIVED:
      return { ...state, qualifications: action.payload };
    default:
      return state;
  }
}

export default qualificationsReducer;
