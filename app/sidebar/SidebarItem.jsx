import React from 'react';
import { Link } from 'react-router';

export default function SidebarItem(props) {
  return (
    <li className={`sinc-sidebar__menu-item ${props.className}`}>
      <Link to={props.to}>
        <i className={`sinc-sidebar__icon fa fa-fw fa-${props.icon}`} />{props.text}
      </Link>
    </li>
  );
}
