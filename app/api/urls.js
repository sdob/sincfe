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

function courseInstructionDetailUrl(courseId, instructionId) {
  return `${API_URL}/courses/${courseId}/instructions/${instructionId}/`;
}

function courseInstructionListUrl(cid) {
  return `${API_URL}/courses/${cid}/instructions/`;
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

function memberCoursesOrganizedListUrl(uid) {
  return `${API_URL}/users/${uid}/courses-organized/`;
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

function qualificationDetailUrl(qid) {
  return `${API_URL}/qualifications/${qid}/`;
}

function qualificationListUrl() {
  return `${API_URL}/qualifications/`;
}

function regionClubListUrl(rid) {
  return `${API_URL}/regions/${rid}/clubs/`;
}

function regionDetailUrl(rid) {
  return `${API_URL}/regions/${rid}/`;
}

function regionMemberListUrl(rid) {
  return `${regionDetailUrl(rid)}users/`;
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
  courseInstructionDetailUrl,
  courseInstructionListUrl,
  coursesListUrl,
  currentMembershipStatusUrl,
  loginUrl,
  memberCoursesOrganizedListUrl,
  memberDetailUrl,
  memberListUrl,
  memberNameSearchUrl,
  memberQualificationListUrl,
  ownProfileUrl,
  qualificationDetailUrl,
  qualificationListUrl,
  regionClubListUrl,
  regionDetailUrl,
  regionsListUrl,
  regionMemberListUrl,
};
