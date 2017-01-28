import axios from 'axios';
import { clubDetailUrl, clubListUrl, clubMemberListUrl } from '../api';
import { createApiAction } from '../shared';
import * as types from './types';

function fetchClub(cid) {
  return function fetch(dispatch) {
    const url = clubDetailUrl(cid);
    axios.get(url)
    .then((response) => {
      const { data } = response;
      dispatch({ type: types.CLUB_DETAIL_RECEIVED, payload: data });
    })
    .catch((error) => {
      console.error(error);
    });
  };
}

function fetchClubList() {
  return function fetch(dispatch) {
    const url = clubListUrl();
    axios.get(url)
    .then((response) => {
      const { data } = response;
      dispatch({ type: types.CLUB_LIST_RECEIVED, payload: data });
    })
    .catch((error) => {
      console.error(error);
      dispatch({ type: types.CLUB_LIST_ERROR, error });
    });
  };
}

function fetchClubMemberList(cid) {
  return function fetch(dispatch) {
    const url = clubMemberListUrl(cid);
    axios.get(url)
    .then((response) => {
      const { data } = response;
      dispatch({ type: types.MEMBER_LIST_RECEIVED, payload: data });
    })
    .catch((error) => {
      console.error(error);
      dispatch({ type: types.MEMBER_LIST_ERROR, payload: error });
    });
  };
}

/* Update a club, using the ID attribute of the data passed in */
const updateClub = club => createApiAction({
  url: clubDetailUrl(club.id), method: 'patch', types: types.clubUpdate, data: club
});

export {
  fetchClub,
  fetchClubList,
  fetchClubMemberList,
  updateClub,
};
