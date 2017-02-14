import {
  clubQualificationsUrl,
  memberQualificationListUrl,
  qualificationDetailUrl,
  qualificationListUrl,
} from '../api/urls';

import { createApiAction } from '../api';

import {
  clubQualificationList,
  memberQualificationList,
  qualificationDetail,
  qualificationList,
} from './types';

/* Retrieve all qualifications for the club with ID 'cid' */
const fetchClubQualifications = cid => createApiAction({
  url: clubQualificationsUrl(cid),
  method: 'get',
  types: clubQualificationList,
});

/* Retrieve all qualifications for the member with ID 'uid' */
const fetchMemberQualifications = uid => createApiAction({
  url: memberQualificationListUrl(uid),
  method: 'get',
  types: memberQualificationList,
});

const fetchQualification = (qid) => createApiAction({
  url: qualificationDetailUrl(qid),
  method: 'get',
  types: qualificationDetail,
});

/* Retrieve ALL qualifications in the system */
const fetchQualifications = () => createApiAction({
  url: qualificationListUrl(),
  method: 'get',
  types: qualificationList,
});

export {
  fetchClubQualifications,
  fetchMemberQualifications,
  fetchQualification,
  fetchQualifications,
};
