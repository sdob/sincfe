import { createApiAction } from '../api';
import {
  regionClubListUrl,
  regionDetailUrl,
  regionsListUrl,
  regionMemberListUrl,
} from '../api/urls';
import {
  regionClubList,
  regionDetail,
  regionList,
  regionMemberList,
} from './types';

const fetchRegionClubList = rid => createApiAction({
  url: regionClubListUrl(rid),
  types: regionClubList,
  method: 'get',
});

const fetchRegionMemberList = rid => createApiAction({
  url: regionMemberListUrl(rid),
  types: regionMemberList,
  method: 'get',
});

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
  fetchRegionClubList,
  fetchRegionDetail,
  fetchRegionMemberList,
  fetchRegions,
};
