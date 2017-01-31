/* eslint-disable no-undef */
/*
 * This defines the API. These functions take zero or more arguments and return
 * URLs for resources on the API server.
 */

function addMemberUrl() {
  return `${API_URL}/users/`;
}

function activeInstructorListUrl(rid) {
  return `${API_URL}/regions/${rid}/active-instructors/`;
}

function certificateListUrl() {
  return `${API_URL}/certificates/`;
}

function clubDetailUrl(cid) {
  return `${API_URL}/clubs/${cid}/`;
}

function clubListUrl() {
  return `${API_URL}/clubs/`;
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

function clubMemberListUrl(cid) {
  return `${API_URL}/clubs/${cid}/users/`;
}

function currentMembershipStatusUrl(uid) {
  return `${API_URL}/users/${uid}/current_membership_status/`;
}

function loginUrl() {
  return `${API_URL}/auth/login/`;
}

function memberDetailUrl(uid) {
  return `${API_URL}/users/${uid}/`;
}

function memberListUrl() {
  return `${API_URL}/users/`;
}

function memberQualificationListUrl(uid) {
  return `${API_URL}/users/${uid}/qualifications/`;
}

function memberNameSearchUrl(name) {
  return `${API_URL}/users/?name=${name}`;
}

function ownProfileUrl() {
  return `${API_URL}/users/me/`;
}

function qualificationListUrl() {
  return `${API_URL}/qualifications/`;
}

function regionDetailUrl(rid) {
  return `${API_URL}/regions/${rid}/`;
}

function regionsListUrl() {
  return `${API_URL}/regions/`;
}

export {
  addMemberUrl,
  activeInstructorListUrl,
  certificateListUrl,
  clubDetailUrl,
  clubQualificationsUrl,
  clubListUrl,
  clubMemberListUrl,
  courseDetailUrl,
  coursesListUrl,
  currentMembershipStatusUrl,
  loginUrl,
  memberDetailUrl,
  memberListUrl,
  memberNameSearchUrl,
  memberQualificationListUrl,
  ownProfileUrl,
  qualificationListUrl,
  regionDetailUrl,
  regionsListUrl,
};
