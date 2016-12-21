import * as types from './types';

function regionsReducer(state = {}, action) {
  switch (action.type) {
    case types.REGIONS_RECEIVED:
      console.log('REGIONS_RECEIVED');
      return { ...state, regions: action.payload };
    default:
      return state;
  }
}

export default regionsReducer;
