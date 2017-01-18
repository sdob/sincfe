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
  const { id } = club;
  return function update(dispatch) {
    const url = clubDetailUrl(id);
    console.info(`sending to: ${url}`);
    dispatch({ type: types.CLUB_DETAIL_SENDING });
    // TODO: actually submit the data
    setTimeout(function() {
      dispatch({ type: types.CLUB_DETAIL_RECEIVED, payload: club });
    }, 500);
  }
}

export {
  fetchClub,
  updateClub,
};
