// TODO: Use Webpack to set API_URL from an environment variable
const API_URL = 'http://localhost:8000';

/*
 * This defines the API. These functions take zero or more arguments and return
 * URLs for resources on the API server.
 */

function addMemberUrl() {
  return `${API_URL}/users/`;
}

function activeInstructorsUrl(rid) {
  return `${API_URL}/regions/${rid}/active-instructors/`;
}

function certificateListUrl() {
  return `${API_URL}/certificates/`;
}

function clubDetailUrl(cid) {
  return `${API_URL}/clubs/${cid}/`;
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

function loginUrl() {
  return `${API_URL}/auth/login/`;
}

function ownProfileUrl() {
  return `${API_URL}/users/me/`;
}

function qualificationsUrl(uid) {
  return `${API_URL}/users/${uid}/qualifications/`;
}

function regionDetailUrl(rid) {
  return `${API_URL}/regions/${rid}/`;
}

function regionsListUrl() {
  return `${API_URL}/regions/`;
}

export {
  addMemberUrl,
  activeInstructorsUrl,
  certificateListUrl,
  clubDetailUrl,
  clubQualificationsUrl,
  courseDetailUrl,
  coursesListUrl,
  currentMembersUrl,
  currentMembershipStatusUrl,
  loginUrl,
  ownProfileUrl,
  qualificationsUrl,
  regionDetailUrl,
  regionsListUrl,
};
