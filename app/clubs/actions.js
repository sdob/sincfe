import axios from 'axios';
import { clubDetailUrl, clubListUrl, clubMemberListUrl } from '../api';
import { createApiAction } from '../shared';
import {
  clubDetail,
  clubList,
  clubMemberList,
  clubUpdate,
} from './types';

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
const updateClub = club => createApiAction({
  url: clubDetailUrl(club.id), method: 'patch', types: clubUpdate, data: club
});

export {
  fetchClub,
  fetchClubList,
  fetchClubMemberList,
  updateClub,
};
