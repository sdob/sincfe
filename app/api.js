import { API_URL } from './constants';

function clubQualificationsUrl(cid) {
  return `${API_URL}/clubs/${cid}/qualifications/`;
}

function coursesListUrl() {
  return `${API_URL}/courses/`;
}

function currentMembersUrl(cid) {
  return `${API_URL}/clubs/${cid}/users/`;
}

function currentMembershipStatusUrl(uid) {
  return `${API_URL}/users/${uid}/current_membership_status/`;
}

function qualificationsUrl(uid) {
  return `${API_URL}/users/${uid}/qualifications/`;
}

function regionsListUrl() {
  return `${API_URL}/regions/`;
}

export {
  clubQualificationsUrl,
  coursesListUrl,
  currentMembersUrl,
  currentMembershipStatusUrl,
  qualificationsUrl,
  regionsListUrl,
};
