import axios from 'axios';
import { currentMembershipStatusUrl } from '../api';

import * as types from './types';

export default function fetchCurrentMembershipStatus(uid) {
  return function fetch(dispatch) {
    const url = currentMembershipStatusUrl(uid);
    axios.get(url)
    .then((response) => {
      dispatch({ type: types.MEMBERSHIP_STATUS_RECEIVED, payload: response.data });
    })
    .catch((error) => {
      console.error(error);
    });
  };
}
