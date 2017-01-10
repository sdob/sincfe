import * as types from './types';

function regionsReducer(state = {}, action) {
  switch (action.type) {
    case types.REGION_DETAIL_RECEIVED:
      return { ...state, regionDetail: action.payload };
    case types.REGIONS_RECEIVED:
      return { ...state, regions: action.payload };
    case types.REGIONS_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default regionsReducer;
