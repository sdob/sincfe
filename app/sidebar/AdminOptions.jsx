import React from 'react';

import SidebarItem from './SidebarItem';
import SidebarMenu from './SidebarMenu';

import * as paths from '../paths';

export default function AdminOptions() {
  return (
    <SidebarMenu
      menuTitle="Admin options"
      menuId="js-adminOptions"
    >
      <SidebarItem icon="search" to={paths.VIEW_CLUBS} text="View clubs" />
      <SidebarItem icon="search" to={paths.VIEW_REGIONS} text="View regions" />
      <SidebarItem icon="users" to={paths.VIEW_MEMBERS} text="View members" />
      <SidebarItem icon="search" to={paths.VIEW_COURSES} text="View courses" />
      <SidebarItem icon="certificate" to={paths.VIEW_QUALIFICATIONS} text="View qualifications" />
    </SidebarMenu>
  );
}
