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

export {
  fetchClub,
};
