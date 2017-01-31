import axios from 'axios';
import { currentMembershipStatusUrl } from '../api/urls';

import * as types from './types';

function handleError(dispatch, error) {
  dispatch({ type: types.MEMBERSHIP_STATUS_ERROR, payload: error });
}

export default function fetchCurrentMembershipStatus(uid) {
  return function fetch(dispatch) {
    const url = currentMembershipStatusUrl(uid);
    axios.get(url)
    .then((response) => {
      dispatch({ type: types.MEMBERSHIP_STATUS_RECEIVED, payload: response.data });
    })
    .catch((error) => {
      handleError(dispatch, error);
    });
  };
}
