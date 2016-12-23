import React from 'react';
import { Link } from 'react-router';

/*
 * A simple presentational component that takes 'icon' and 'text'
 * properties (and, optionally, extra classNames) and returns the
 * HTML we want. It keeps things consistent and saves us boilerplate
 * in the sidebar components.
 */
export default function SidebarItem(props) {
  return (
    <li className={`sinc-sidebar__menu-item ${props.className}`}>
      <Link to={props.to}>
        <i className={`sinc-sidebar__icon fa fa-fw fa-${props.icon}`} />{props.text}
      </Link>
    </li>
  );
}
