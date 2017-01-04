import React from 'react';
import SidebarItem from './SidebarItem';
import SidebarMenu from './SidebarMenu';

import * as paths from '../paths';

export default function TreasurerOptions() {
  return (
    <SidebarMenu
      menuId="js-treasurerOptions"
      menuTitle="Treasurer options"
    >
      <SidebarItem icon="search" to={paths.SEARCH_CURRENT_MEMBERS} text="Search current members" />
      <SidebarItem icon="money" to={paths.CLUB_RENEWAL_ORDERS} text="Renewal orders" />
    </SidebarMenu>
  );
}
