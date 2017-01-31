import axios from 'axios';
import { createApiAction } from '../api';
import { regionDetailUrl, regionsListUrl } from '../api/urls';
// import * as types from './types';
import {
  regionDetail,
  regionList,
} from './types';

function handleError(dispatch, error) {
  // TODO: implement proper error-handling here.
  return dispatch({ type: types.REGIONS_ERROR, payload: error });
}

const fetchRegionDetail = rid => createApiAction({
  url: regionDetailUrl(rid),
  types: regionDetail,
  method: 'get',
});

const fetchRegions = () => createApiAction({
  url: regionsListUrl(),
  types: regionList,
  method: 'get',
});

export {
  fetchRegionDetail,
  fetchRegions,
};
