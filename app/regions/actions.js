import axios from 'axios';
import { regionDetailUrl, regionsListUrl } from '../api';
import * as types from './types';

function handleError(dispatch, error) {
  // TODO: implement proper error-handling here.
  return dispatch({ type: types.REGIONS_ERROR, payload: error });
}

function fetchRegionDetail(rid) {
  return function fetch(dispatch) {
    axios.get(regionDetailUrl(rid))
    .then((response) => {
      dispatch({ type: types.REGION_DETAIL_RECEIVED, payload: response.data });
    })
    .catch((error) => {
      handleError(dispatch, error);
    });
  }
}

function fetchRegions() {
  return function fetch(dispatch) {
    axios.get(regionsListUrl())
    .then((response) => {
      dispatch({ type: types.REGIONS_RECEIVED, payload: response.data });
    })
    .catch((error) => {
      // There's been an error (4xx or 5xx); let the error handler
      // take care of it
      handleError(dispatch, error);
    });
  };
}

export {
  fetchRegionDetail,
  fetchRegions,
};
