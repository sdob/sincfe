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
import AddMember from './add-member/AddMember';
import ContactUs from './contact-us/ContactUs';
import ClubDetails from './club-details/ClubDetails';
import ClubRenewalOrders from './club-renewal-orders/ClubRenewalOrders';
import ClubQualifications from './club-qualifications/ClubQualifications';
import Documents from './documents/Documents';
import EditProfile from './profile/EditProfile';
import HelpPage from './help-page/HelpPage';
import MemberQualifications from './member-qualifications/MemberQualifications';
import MedicalDisclaimer from './medical-disclaimer/MedicalDisclaimer';
import MembershipHistory from './membership-history/MembershipHistory';
import OrganizeCourses from './organize-courses/OrganizeCourses';
import RequireAuth from './auth/RequireAuth';
import SearchCurrentMembers from './search-current-members/SearchCurrentMembers';
import TeachCourses from './teach-courses/TeachCourses';
import ViewCourses from './view-courses/ViewCourses';

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
    {/*
      * Dive Officer options. These should be listed in this file in the same order in which
      * they appear in the rendered sidebar.
      */}
    <Route path={paths.SEARCH_CURRENT_MEMBERS} component={RequireAuth(SearchCurrentMembers)} />
    <Route path={paths.ADD_MEMBER} component={RequireAuth(AddMember)} />
    <Route path={paths.CLUB_RENEWAL_ORDERS} component={RequireAuth(ClubRenewalOrders)} />
    <Route path={paths.CLUB_QUALIFICATIONS} component={RequireAuth(ClubQualifications)} />
    <Route path={paths.CLUB_DETAILS} component={RequireAuth(ClubDetails)} />
    {/*
      * Member options. These should be listed in this file in the same order in which
      * they appear in the rendered sidebar.
      */}
    <Route path={paths.DOCUMENTS} component={RequireAuth(Documents)} />
    <Route path={paths.PROFILE} component={RequireAuth(EditProfile)} />
    <Route path={paths.MEDICAL_DISCLAIMER} component={RequireAuth(MedicalDisclaimer)} />
    <Route path={paths.MEMBER_QUALIFICATIONS} component={RequireAuth(MemberQualifications)} />
    <Route path={paths.MEMBERSHIP_HISTORY} component={RequireAuth(MembershipHistory)} />
    <Route path={paths.VIEW_COURSES} component={RequireAuth(ViewCourses)} />
    <Route path={paths.ORGANIZE_COURSES} component={RequireAuth(OrganizeCourses)} />
    <Route path={paths.TEACH_COURSES} component={RequireAuth(TeachCourses)} />
    <Redirect path="*" to="/" />
  </Route>
);
