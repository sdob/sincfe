import { clubDetailUrl, clubListUrl, clubMemberListUrl } from '../api/urls';
import { createApiAction } from '../api';
import {
  clubAdd,
  clubDelete,
  clubDetail,
  clubList,
  clubMemberList,
  clubUpdate,
} from './types';

const addClub = data => createApiAction({
  data,
  url: clubListUrl(),
  method: 'post',
  types: clubAdd,
});

const deleteClub = cid => createApiAction({
  url: clubDetailUrl(cid),
  method: 'delete',
  types: clubDelete,
});

const fetchClub = cid => createApiAction({
  url: clubDetailUrl(cid), method: 'get', types: clubDetail,
});

const fetchClubList = () => createApiAction({
  url: clubListUrl(), method: 'get', types: clubList,
});

const fetchClubMemberList = cid => createApiAction({
  url: clubMemberListUrl(cid), method: 'get', types: clubMemberList,
});

/* Update a club, using the ID attribute of the data passed in */
const updateClub = data => createApiAction({
  data,
  url: clubDetailUrl(data.id),
  method: 'patch',
  types: clubUpdate,
});

export {
  addClub,
  deleteClub,
  fetchClub,
  fetchClubList,
  fetchClubMemberList,
  updateClub,
};
