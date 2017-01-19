import axios from 'axios';
import { clubMemberListUrl } from '../api';
import { CURRENT_MEMBERS_ERROR, CURRENT_MEMBERS_RECEIVED } from './types';

export default function fetchCurrentMembers(cid) {
  return function fetch(dispatch) {
    const url = clubMemberListUrl(cid);
    axios.get(url)
    .then((response) => {
      const currentMembers = response.data;
      dispatch({ type: CURRENT_MEMBERS_RECEIVED, payload: currentMembers });
    })
    .catch((error) => {
      console.error(error);
      dispatch({ type: CURRENT_MEMBERS_ERROR, payload: error });
    });
  };
}
