import axios from 'axios';
import { currentMembershipStatusUrl } from '../api';

import { CMS_RECEIVED } from './types';

export default function fetchCurrentMembershipStatus(uid) {
  return function fetch(dispatch) {
    const url = currentMembershipStatusUrl(uid);
    axios.get(url)
    .then((response) => {
      dispatch({ type: CMS_RECEIVED, payload: response.data });
    })
    .catch((error) => {
      console.error(error);
    });
  };
}
