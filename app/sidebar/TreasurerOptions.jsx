import React from 'react';
import SidebarItem from './SidebarItem';
import SidebarMenu from './SidebarMenu';

export default function TreasurerOptions() {
  return (
    <SidebarMenu
      menuId="js-treasurerOptions"
      menuTitle="Treasurer options"
    >
      <SidebarItem icon="search" to="SearchMembers" text="Search current members" />
      <SidebarItem icon="money" to="RenewalOrders" text="Renewal orders" />
    </SidebarMenu>
  );
}
