import { clubQualificationsUrl, memberQualificationListUrl, qualificationListUrl } from '../api/urls';
import { createApiAction } from '../api';
import {
  clubQualificationList,
  memberQualificationList,
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
  types: clubQualificationList,
});

/* Retrieve ALL qualifications in the system */
const fetchQualifications = () => createApiAction({
  url: qualificationListUrl(),
  method: 'get',
  types: clubQualificationList,
});

export {
  fetchClubQualifications,
  fetchMemberQualifications,
  fetchQualifications,
};
