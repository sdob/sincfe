import React from 'react';
import { connect } from 'react-redux';
import SidebarMenu from './SidebarMenu';
import SidebarItem from './SidebarItem';
import * as paths from '../paths';

function MemberOptions(props) {
  const { profile } = props;
  return (
    <SidebarMenu
      menuTitle="Member options"
      menuId="js-memberOptions"
    >
      <SidebarItem icon="user" to={paths.EDIT_PROFILE} text="Edit profile" />
      <SidebarItem icon="certificate" to={paths.MEMBER_QUALIFICATIONS} text="View Qualifications" />
      <SidebarItem icon="clock-o" to={paths.MEMBERSHIP_HISTORY} text="Membership history" />
      <SidebarItem icon="list" to={paths.VIEW_COURSES} text="View courses" />
      <SidebarItem icon="list" to={paths.ORGANIZE_COURSES} text="Organize courses" />
      {profile.is_instructor && (
        <SidebarItem icon="mortar-board" to={paths.TEACH_COURSES} text="Teach courses" />
      )}
    </SidebarMenu>
  );
}

function mapStateToProps(state) {
  const { profile } = state.profiles;
  return {
    profile,
  };
}

export default connect(mapStateToProps)(MemberOptions);
