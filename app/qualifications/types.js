import { createTypes } from '../shared';

const clubQualificationList = createTypes('CLUB_QUALIFICATION_LIST');
const memberQualificationList = createTypes('MEMBER_QUAlIFICATION_LIST');
const qualificationAdd = createTypes('QUALIFICATION_ADD');
const qualificationDelete = createTypes('QUALIFICATION_DELETE');
const qualificationDetail = createTypes('QUALIFICATION_DETAIL');
const qualificationList = createTypes('QUALIFICATION_LIST');
const qualificationUpdate = createTypes('QUALIFICATION_UPDATE');

export {
  clubQualificationList,
  memberQualificationList,
  qualificationAdd,
  qualificationDelete,
  qualificationDetail,
  qualificationList,
  qualificationUpdate,
};
