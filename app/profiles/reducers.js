import {
  memberCreate,
  memberDetail,
  memberList,
  memberUpdate,
  ownProfileRetrieve,
  ownProfileUpdate,
} from './types';

/*
 * Handle profile-related actions here
 */

export default function authReducer(initialState = {}, action) {
  // Usually, we want to make sure that 'sending' is false
  const state = { ...initialState, sending: false };
  switch (action.type) {
    case memberCreate.success:
      return { ...state, user: action.payload };
    // Retrieving the user's own profile
    case ownProfileRetrieve.success:
      return { ...state, profile: action.payload };
    // Profile updates
    case ownProfileUpdate.success:
      return { ...state, profile: action.payload };
    case ownProfileUpdate.error:
      return { ...state, errorMsg: action.payload };
    // Retrieving member by ID
    case memberDetail.success:
      console.info('member detail received');
      return { ...state, member: action.payload };
    // Retrieving all members
    case memberList.success:
      return { ...state, members: action.payload };
    case memberList.error:
      return { ...state, errorMsg: action.payload };
    // Updating member
    case memberUpdate.success:
      return { ...state, member: action.payload };
    default:
      return initialState;
  }
}

