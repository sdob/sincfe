import React from 'react';
import SidebarItem from './SidebarItem';

import * as paths from '../paths';

export default function DivingOfficerOptions() {
  return (
    <div className="sinc-sidebar__section">
      <div className="sinc-sidebar__header">
        <h2>Diving Officer options</h2>
      </div>
      <ul className="nav sinc-sidebar__menu">
        <SidebarItem
          icon="search"
          to={paths.SEARCH_CURRENT_MEMBERS}
          text="Search current members"
        />
        <SidebarItem icon="plus" to={paths.ADD_MEMBER} text="Add member" />
        <SidebarItem icon="money" to={paths.CLUB_RENEWAL_ORDERS} text="Renewal orders" />
        <SidebarItem icon="certificate" to={paths.CLUB_QUALIFICATIONS} text="Qualifications" />
        <SidebarItem icon="institution" to={paths.CLUB_DETAILS} text="Club details" />
        <SidebarItem icon="mortar-board" to={paths.ACTIVE_INSTRUCTORS} text="Active instructors" />
      </ul>
    </div>
  );
}
