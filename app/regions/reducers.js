// import * as types from './types';
import { regionDetail, regionList } from './types';

function regionsReducer(state = {}, action) {
  switch (action.type) {
    case regionDetail.success:
      return { ...state, regionDetail: action.payload };
    case regionList.success:
      return { ...state, regions: action.payload };
    case regionDetail.error:
    case regionList.error:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default regionsReducer;
