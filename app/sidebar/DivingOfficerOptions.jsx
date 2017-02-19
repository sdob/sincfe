import React, { Component } from 'react';
import { connect } from 'react-redux';
import SidebarItem from './SidebarItem';
import SidebarMenu from './SidebarMenu';

import * as paths from '../paths';

class DivingOfficerOptions extends Component {
  render() {
    const { profile } = this.props;
    if (!profile) return null;
    const { club } = profile;
    return (
      <SidebarMenu
        menuTitle="Diving Officer options"
        menuId="js-divingOfficerOptions"
      >
        <SidebarItem
          icon="search"
          to={paths.SEARCH_CURRENT_MEMBERS}
          text="Search current members"
        />
        <SidebarItem icon="plus" to={paths.ADD_MEMBER} text="Add member" />
        <SidebarItem icon="money" to={paths.CLUB_RENEWAL_ORDERS} text="Renewal orders" />
        <SidebarItem icon="certificate" to={paths.CLUB_QUALIFICATIONS} text="Qualifications" />
        <SidebarItem icon="institution" to={`${paths.EDIT_CLUB}/${club.id}`} text="Club details" />
        <SidebarItem icon="mortar-board" to={paths.ACTIVE_INSTRUCTORS} text="Active instructors" />
      </SidebarMenu>
    );
  }
}

function mapStateToProps(state) {
  const { profile } = state.profiles;
  return { profile };
}

export default connect(mapStateToProps)(DivingOfficerOptions);
