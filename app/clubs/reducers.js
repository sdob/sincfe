import * as types from './types';

const { clubDetail, clubList, clubMemberList, clubUpdate } = types;

export default function clubsReducer(initialState = {}, action) {
  const state = { ...initialState, sending: false };
  switch (action.type) {
    // Handle 'pending' events
    case clubDetail.pending:
    case clubList.pending:
    case clubMemberList.pending:
    case clubUpdate.pending:
      return { ...state, sending: true };

    // Handle 'success' events
    case clubDetail.success:
      return { ...state, club: action.payload };
    case clubList.success:
      return { ...state, clubList: action.payload };
    case clubMemberList.success:
      return { ...state, memberList: action.payload };
    case clubUpdate.success:
      return { ...state, update: action.payload };

    // Handle default
    default:
      return initialState;
  }
}
