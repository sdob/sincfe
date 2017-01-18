import axios from 'axios';

import { clubQualificationsUrl, qualificationsUrl } from '../api';
import * as types from './types';

function handleError(dispatch, error, type = types.GENERIC_QUALIFICATIONS_ERROR) {
  console.error(error);
  dispatch({ type, payload: error });
}

function fetchClubQualifications(cid) {
  return function fetch(dispatch) {
    const url = clubQualificationsUrl(cid);
    axios.get(url)
    .then((response) => {
      const qualifications = response.data;
      dispatch({ type: types.CLUB_QUALIFICATIONS_RECEIVED, payload: qualifications });
    })
    .catch((error) => {
      handleError(dispatch, error, types.CLUB_QUALIFICATIONS_ERROR);
    });
  };
}

function fetchMemberQualifications(uid) {
  return function fetch(dispatch) {
    const url = qualificationsUrl(uid);
    axios.get(url)
    .then((response) => {
      const qualifications = response.data;
      dispatch({ type: types.MEMBER_QUALIFICATIONS_RECEIVED, payload: qualifications });
    })
    .catch((error) => {
      handleError(dispatch, error, types.MEMBER_QUALIFICATIONS_ERROR);
    });
  };
}

export {
  fetchClubQualifications,
  fetchMemberQualifications,
};
