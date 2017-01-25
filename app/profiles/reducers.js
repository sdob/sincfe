import * as types from './types';

/*
 * Handle profile-related actions here
 */

export default function authReducer(initialState = {}, action) {
  // Usually, we want to make sure that 'sending' is false
  const state = { ...initialState, sending: false };
  switch (action.type) {
    case types.PROFILE_CREATE_SENDING:
      return { ...state, sending: true };
    case types.PROFILE_CREATE_ERROR:
      return { ...state, errorMsg: action.payload };
    case types.PROFILE_CREATE_SUCCESS:
      return { ...state, user: action.payload };
    // Retrieving the user's own profile
    case types.OWN_PROFILE_RECEIVED:
      return { ...state, profile: action.payload };
    // Profile updates
    case types.PROFILE_UPDATE_SENDING:
      return { ...state, sending: true };
    case types.PROFILE_UPDATE_SUCCESS:
      return { ...state, profile: action.payload };
    case types.PROFILE_UPDATE_ERROR:
      return { ...state, errorMsg: action.payload };
    // Retrieving member by ID
    case types.MEMBER_DETAIL_FETCHING:
      return { ...state, sending: true };
    case types.MEMBER_DETAIL_RECEIVED:
      console.info('member detail received');
      return { ...state, member: action.payload };
    // Retrieving all members
    case types.MEMBER_LIST_RECEIVED:
      return { ...state, members: action.payload };
    case types.MEMBER_LIST_ERROR:
      return { ...state, errorMsg: action.payload };
    // Updating member
    case types.UPDATE_MEMBER_SENDING:
      return { ...state, sending: true };
    case types.UPDATE_MEMBER_SUCCESS:
      return { ...state, member: action.payload };
    default:
      return initialState;
  }
}

