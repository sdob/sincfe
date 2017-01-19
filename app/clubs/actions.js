import axios from 'axios';
import { clubDetailUrl } from '../api';
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

function updateClub(club) {
  return function update(dispatch) {
    // Get the API endpoint for updating this club
    const { id } = club;
    const url = clubDetailUrl(id);
    // Dispatch an event
    dispatch({ type: types.CLUB_DETAIL_SENDING });
    axios.patch(url, club)
    .then((response) => {
      const { data } = response;
      dispatch({ type: types.CLUB_UPDATE_SUCCESS, payload: data });
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
  };
}

export {
  fetchClub,
  updateClub,
};
