import axios from 'axios';

import { clubQualificationsUrl, qualificationsUrl } from '../api';
import { CLUB_QUALIFICATIONS_RECEIVED, MEMBER_QUALIFICATIONS_RECEIVED } from './types';

function fetchClubQualifications(cid) {
  return function fetch(dispatch) {
    const url = clubQualificationsUrl(cid);
    axios.get(url)
    .then((response) => {
      const qualifications = response.data;
      dispatch({ type: CLUB_QUALIFICATIONS_RECEIVED, payload: qualifications });
    })
    .catch((error) => {
      console.error(error);
    });
  };
}

function fetchMemberQualifications(uid) {
  return function fetch(dispatch) {
    const url = qualificationsUrl(uid);
    axios.get(url)
    .then((response) => {
      const qualifications = response.data;
      dispatch({ type: MEMBER_QUALIFICATIONS_RECEIVED, payload: qualifications });
    })
    .catch((error) => {
      console.error(error);
    });
  };
}

export {
  fetchClubQualifications,
  fetchMemberQualifications,
};
