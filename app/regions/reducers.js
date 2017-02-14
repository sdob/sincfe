import {
  regionClubList,
  regionDetail,
  regionList,
  regionMemberList,
} from './types';

function regionsReducer(state = {}, action) {
  switch (action.type) {
    case regionClubList.success:
      return { ...state, regionClubList: action.payload };
    case regionDetail.success:
      return { ...state, regionDetail: action.payload };
    case regionList.success:
      return { ...state, regions: action.payload };
    case regionMemberList.success:
      return { ...state, regionMemberList: action.payload };
    case regionDetail.error:
    case regionList.error:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default regionsReducer;
