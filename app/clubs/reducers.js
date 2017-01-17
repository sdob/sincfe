import * as types from './types';

export default function clubsReducer(state = {}, action) {
  switch (action.type) {
    case types.CLUB_DETAIL_RECEIVED:
      return { ...state, club: action.payload };
    default:
      return state;
  }
}
