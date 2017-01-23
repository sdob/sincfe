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

// Other components; imports in alphabetical order, please
import ActiveInstructors from './active-instructors/ActiveInstructors';
import AddMember from './profiles/AddMember';
import ContactUs from './contact-us/ContactUs';
import CourseDetail from './courses/CourseDetail';
import ClubMemberList from './clubs/ClubMemberList';
import ClubRenewalOrders from './renewal-orders/ClubRenewalOrders';
import ClubQualifications from './qualifications/ClubQualifications';
import Documents from './documents/Documents';
import EditClubDetails from './clubs/EditClubDetails';
import EditMember from './profiles/EditMember';
import EditProfile from './profiles/EditProfile';
import HelpPage from './help-page/HelpPage';
import MemberQualifications from './qualifications/MemberQualifications';
import MedicalDisclaimer from './medical-disclaimer/MedicalDisclaimer';
import MembershipHistory from './membership-history/MembershipHistory';
import OrganizeCourses from './courses/OrganizeCourses';
import RequireAuth from './auth/RequireAuth';
import TeachCourses from './courses/TeachCourses';
import ViewClubs from './clubs/ViewClubs';
import ViewCourses from './courses/ViewCourses';

// Define and export app routes
export default (
  <Route path="/" component={App}>
    {/*
      * Default to the main page
      */}
    <IndexRoute component={RequireAuth(Main)} />
    {/*
      * Authentication routes
      */}
    <Route path={paths.LOGIN} component={Login} />
    <Route path={paths.LOGOUT} component={Logout} />
    {/*
      * Static top-nav routes
      */}
    <Route path={paths.HELP_PAGE} component={RequireAuth(HelpPage)} />
    <Route path={paths.CONTACT_US} component={RequireAuth(ContactUs)} />
    {/* Admin options */}
    <Route path={paths.VIEW_CLUBS} component={RequireAuth(ViewClubs)} />
    {/*
      * Dive Officer options. These should be listed in this file in the same order in which
      * they appear in the rendered sidebar.
      */}
    <Route path={paths.SEARCH_CURRENT_MEMBERS} component={RequireAuth(ClubMemberList)} />
    <Route path={paths.ADD_MEMBER} component={RequireAuth(AddMember)} />
    <Route path={paths.CLUB_RENEWAL_ORDERS} component={RequireAuth(ClubRenewalOrders)} />
    <Route path={paths.CLUB_QUALIFICATIONS} component={RequireAuth(ClubQualifications)} />
    <Route path={paths.CLUB_DETAILS} component={RequireAuth(EditClubDetails)} />
    <Route path={paths.ACTIVE_INSTRUCTORS} component={RequireAuth(ActiveInstructors)} />
    {/* Routes available to the DO but not actually present in the sidebar */}
    <Route path={`${paths.EDIT_MEMBER}/:id`} component={RequireAuth(EditMember)} />
    {/*
      * Member options. These should be listed in this file in the same order in which
      * they appear in the rendered sidebar.
      */}
    <Route path={paths.DOCUMENTS} component={RequireAuth(Documents)} />
    <Route path={paths.EDIT_PROFILE} component={RequireAuth(EditProfile)} />
    <Route path={paths.MEDICAL_DISCLAIMER} component={RequireAuth(MedicalDisclaimer)} />
    <Route path={paths.MEMBER_QUALIFICATIONS} component={RequireAuth(MemberQualifications)} />
    <Route path={paths.MEMBERSHIP_HISTORY} component={RequireAuth(MembershipHistory)} />
    <Route path={paths.VIEW_COURSES} component={RequireAuth(ViewCourses)} />
    <Route path={`${paths.VIEW_COURSES}/:id`} component={RequireAuth(CourseDetail)} />
    <Route path={paths.ORGANIZE_COURSES} component={RequireAuth(OrganizeCourses)} />
    <Route path={paths.TEACH_COURSES} component={RequireAuth(TeachCourses)} />
    <Redirect path="*" to="/" />
  </Route>
);
