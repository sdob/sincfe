import { createApiAction } from '../api';
import { regionDetailUrl, regionsListUrl } from '../api/urls';
import {
  regionDetail,
  regionList,
} from './types';

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
