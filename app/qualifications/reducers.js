import {
  clubQualificationList,
  memberQualificationList,
  qualificationList,
} from './types';

function qualificationsReducer(state = {}, action) {
  switch (action.type) {
    // Handle success
    case clubQualificationList.success:
      return { ...state, qualifications: action.payload };
    case memberQualificationList.success:
      return { ...state, qualifications: action.payload };
    case qualificationList.success:
      return { ...state, qualifications: action.payload };

    // Handle errors
    case clubQualificationList.error:
    case memberQualificationList.error:
    case qualificationList.error:
      return { ...state, errorMsg: action.payload };
    default:
      return state;
  }
}

export default qualificationsReducer;
