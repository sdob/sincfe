import {
  clubQualificationsUrl,
  memberQualificationListUrl,
  qualificationDetailUrl,
  qualificationListUrl,
} from '../api/urls';

import { createApiAction } from '../api';

import { date2django } from '../shared/dateUtils';

import {
  clubQualificationList,
  memberQualificationList,
  qualificationAdd,
  qualificationDelete,
  qualificationDetail,
  qualificationList,
  qualificationUpdate,
} from './types';

const addQualification = data => createApiAction({
  data,
  url: qualificationListUrl(),
  method: 'post',
  types: qualificationAdd,
  formatRequest: formatRequestQualificationDate,
});

const deleteQualification = qualification => createApiAction({
  url: qualificationDetailUrl(qualification.id),
  method: 'delete',
  types: qualificationDelete,
});

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

const fetchQualification = qid => createApiAction({
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

const updateQualification = data => createApiAction({
  data,
  url: qualificationDetailUrl(data.id),
  method: 'put',
  types: qualificationUpdate,
});

function formatRequestQualificationDate(qualification) {
  return {
    ...qualification,
    date_granted: date2django(qualification.date_granted),
  };
}

export {
  addQualification,
  deleteQualification,
  fetchClubQualifications,
  fetchMemberQualifications,
  fetchQualification,
  fetchQualifications,
  updateQualification,
};
