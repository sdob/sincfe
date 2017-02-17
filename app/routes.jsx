import React from 'react';
import { IndexRoute, Redirect, Route } from 'react-router';

// Our base app component
import App from './App';

// The logout component
import Logout from './auth/Logout';

// Path strings, used across modules
import * as paths from './paths';

// Login page
import Login from './pages/Login';

// Static landing page for authenticated users
import Main from './pages/Main';

// Higher-order components
import { requireRole, roles } from './roles';

// Other components; imports in alphabetical order, please
import ActiveInstructors from './active-instructors/ActiveInstructors';
import AddClub from './clubs/AddClub';
import AddCourse from './courses/AddCourse';
import AddMember from './profiles/AddMember';
import ContactUs from './contact-us/ContactUs';
import CourseDetail from './courses/CourseDetail';
import ClubMemberList from './clubs/ClubMemberList';
import ClubRenewalOrders from './renewal-orders/ClubRenewalOrders';
import ClubQualifications from './qualifications/ClubQualifications';
import Documents from './documents/Documents';
import EditClub from './clubs/EditClub';
import EditCourse from './courses/EditCourse';
import EditMember from './profiles/EditMember';
import EditProfile from './profiles/EditProfile';
import EditQualification from './qualifications/EditQualification';
import HelpPage from './help-page/HelpPage';
import MemberQualifications from './qualifications/MemberQualifications';
import MedicalDisclaimer from './medical-disclaimer/MedicalDisclaimer';
import MembershipHistory from './membership-history/MembershipHistory';
import OrganizeCourses from './courses/OrganizeCourses';
import TeachCourses from './courses/TeachCourses';
import ViewClubs from './clubs/ViewClubs';
import ViewCourses from './courses/ViewCourses';
import ViewMembers from './profiles/ViewMembers';
import ViewQualifications from './qualifications/ViewQualifications';
import ViewRegions from './regions/ViewRegions';
import ViewRegionDetail from './regions/ViewRegionDetail';

import { AddQualification } from './qualifications';

// Define privileges
const { Administrator, DiveOfficer, Member } = roles;
const RequireAdmin = requireRole(Administrator);
const RequireAuth = requireRole(Member);
const RequireDiveOfficer = requireRole(DiveOfficer);
const RequireAdminOrDiveOfficer = requireRole(Administrator.or(DiveOfficer));

// Define and export app routes
export default (
  <Route path="/" component={App}>
    <IndexRoute component={RequireAuth(Main)} />
    {/* Routes that require admin privileges */}
    <Route path={paths.ADD_QUALIFICATION} component={RequireAdmin(AddQualification)} />
    <Route path={paths.VIEW_CLUBS} component={RequireAdmin(ViewClubs)} />
    <Route path={paths.VIEW_MEMBERS} component={RequireAdmin(ViewMembers)} />
    <Route path={paths.ADD_CLUB} component={RequireAdmin(AddClub)} />
    <Route path={paths.VIEW_REGIONS} component={RequireAdmin(ViewRegions)} />

    {/* Routes that require admin or DO privileges */}
    <Route path={`${paths.EDIT_MEMBER}/:id`} component={RequireAdminOrDiveOfficer(EditMember)} />
    <Route path={paths.ADD_MEMBER} component={RequireAdminOrDiveOfficer(AddMember)} />
    <Route path={`${paths.EDIT_CLUB}/:id`} component={RequireAdminOrDiveOfficer(EditClub)} />

    {/* Routes that require DO privileges */}

    {/* Routes that don't require admin privileges */}
    <Route path={paths.ACTIVE_INSTRUCTORS} component={RequireAuth(ActiveInstructors)} />
    <Route path={paths.ADD_COURSE} component={RequireAuth(AddCourse)} />
    <Route path={paths.CLUB_QUALIFICATIONS} component={RequireAuth(ClubQualifications)} />
    <Route path={paths.CLUB_RENEWAL_ORDERS} component={RequireAuth(ClubRenewalOrders)} />
    <Route path={paths.CONTACT_US} component={RequireAuth(ContactUs)} />
    <Route path={paths.DOCUMENTS} component={RequireAuth(Documents)} />
    <Route path={`${paths.EDIT_COURSE}/:id`} component={RequireAuth(EditCourse)} />
    <Route path={`${paths.EDIT_QUALIFICATION}/:id`} component={RequireAuth(EditQualification)} />
    <Route path={`${paths.EDIT_REGION}/:id`} component={RequireAuth(ViewRegionDetail)} />
    <Route path={paths.EDIT_PROFILE} component={RequireAuth(EditProfile)} />
    <Route path={paths.HELP_PAGE} component={RequireAuth(HelpPage)} />
    <Route path={paths.LOGIN} component={Login} />
    <Route path={paths.LOGOUT} component={RequireAuth(Logout)} />
    <Route path={paths.MEDICAL_DISCLAIMER} component={RequireAuth(MedicalDisclaimer)} />
    <Route path={paths.MEMBER_QUALIFICATIONS} component={RequireAuth(MemberQualifications)} />
    <Route path={paths.MEMBERSHIP_HISTORY} component={RequireAuth(MembershipHistory)} />
    <Route path={paths.ORGANIZE_COURSES} component={RequireAuth(OrganizeCourses)} />
    <Route path={paths.SEARCH_CURRENT_MEMBERS} component={RequireAuth(ClubMemberList)} />
    <Route path={paths.TEACH_COURSES} component={RequireAuth(TeachCourses)} />
    <Route path={paths.VIEW_COURSES} component={RequireAuth(ViewCourses)} />
    <Route path={`${paths.VIEW_COURSES}/:id`} component={RequireAuth(CourseDetail)} />
    <Route path={paths.VIEW_QUALIFICATIONS} component={RequireAuth(ViewQualifications)} />
    <Redirect path="*" to="/" />
  </Route>
);
