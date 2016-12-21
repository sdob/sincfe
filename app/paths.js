/*
 * Path string constants. Rather than type these out explicitly in
 * each place they're used, we'll define them here and import them
 * elsewhere. This makes it trivial to rewrite our URL structure
 * if we need to; it also means that <Link /> components will be
 * visibly inactive if they point to an undefined path.
 *
 * These definitions should abide by the following conventions:
 * (1) they're listed in this file in alphabetical order;
 * (2) the exported identifiers are in all-caps, with words connected by underscores;
 * (3) the string values are lower-case, with words connected by hyphens.
 */

export const ADD_MEMBER = 'add-member';
export const CLUB_DETAILS = 'club-details';
export const CLUB_QUALIFICATIONS = 'club-qualifications';
export const CLUB_RENEWAL_ORDERS = 'club-renewal-orders';
export const CONTACT_US = 'contact-us';
export const DOCUMENTS = 'documents';
export const HELP_PAGE = 'help';
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const MEDICAL_DISCLAIMER = 'medical-disclaimer';
export const MEMBER_QUALIFICATIONS = 'member-qualifications';
export const MEMBERSHIP_HISTORY = 'membership-history';
export const ORGANIZE_COURSES = 'organize-courses';
export const PROFILE = 'edit-profile';
export const SEARCH_CURRENT_MEMBERS = 'search-current-members';
export const TEACH_COURSES = 'teach-courses';
export const VIEW_COURSES = 'view-courses';
