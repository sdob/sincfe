import React from 'react';
import SidebarItem from './SidebarItem';

export default function TreasurerOptions() {
  return (
    <div className="sinc-sidebar__section">
      <div className="sinc-sidebar__header">
        <h2>Treasurer options</h2>
      </div>
      <ul className="nav sinc-sidebar__menu">
        <SidebarItem icon="search" to="SearchMembers" text="Search current members" />
        <SidebarItem icon="money" to="RenewalOrders" text="Renewal orders" />
      </ul>
    </div>
  );
}
