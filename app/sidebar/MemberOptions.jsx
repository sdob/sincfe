import React, { Component } from 'react';
import SidebarItem from './SidebarItem';
import * as paths from '../paths';

export default function MenuOptions() {
  return (
    <div className="sinc-sidebar__section">
      <div className="sinc-sidebar__header">
        <h2>
          Member options
          <a
            className="float-xs-right sinc-sidebar__collapse-button"
            data-target="#js-memberOptionsMenu"
            data-toggle="collapse"
            href="#"
          >
            <i className="fa fa-chevron-down" />
          </a>
        </h2>
      </div>
      <ul id="js-memberOptionsMenu" className="collapse nav sinc-sidebar__menu">
        <SidebarItem icon="file" to={paths.DOCUMENTS} text="Documents" />
        <SidebarItem icon="user" to={paths.PROFILE} text="Edit profile" />
        <SidebarItem
          icon="heartbeat"
          to={paths.MEDICAL_DISCLAIMER}
          text="Annual medical disclaimer"
        />
        <SidebarItem
          icon="certificate"
          to={paths.MEMBER_QUALIFICATIONS}
          text="Your qualifications"
        />
        <SidebarItem icon="clock-o" to={paths.MEMBERSHIP_HISTORY} text="Membership history" />
        <SidebarItem icon="list" to={paths.VIEW_COURSES} text="View courses" />
        <SidebarItem icon="list" to={paths.ORGANIZE_COURSES} text="Organize courses" />
        <SidebarItem icon="mortar-board" to={paths.TEACH_COURSES} text="Teach courses" />
      </ul>
    </div>
  );
}
