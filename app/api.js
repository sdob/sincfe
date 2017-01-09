import { API_URL } from './constants';

/*
 * This defines the API. These functions take zero or more arguments and return
 * URLs for resources on the API server.
 */

function addMemberUrl() {
  return `${API_URL}/users/`;
}

function activeInstructorsUrl() {
  return `${API_URL}/users/active-instructors/`;
}

function certificateListUrl() {
  return `${API_URL}/certificates/`;
}

function clubQualificationsUrl(cid) {
  return `${API_URL}/clubs/${cid}/qualifications/`;
}

function courseDetailUrl(cid) {
  return `${API_URL}/courses/${cid}/`;
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

function ownProfileUrl() {
  return `${API_URL}/users/me/`;
}

function qualificationsUrl(uid) {
  return `${API_URL}/users/${uid}/qualifications/`;
}

function regionsListUrl() {
  return `${API_URL}/regions/`;
}

export {
  addMemberUrl,
  activeInstructorsUrl,
  certificateListUrl,
  clubQualificationsUrl,
  courseDetailUrl,
  coursesListUrl,
  currentMembersUrl,
  currentMembershipStatusUrl,
  ownProfileUrl,
  qualificationsUrl,
  regionsListUrl,
};
