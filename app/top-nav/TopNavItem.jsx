import React from 'react';

import { Link } from 'react-router';

export default function TopNavItem(props) {
  return (
    <li className={`nav-item ${props.className}`}>
      <Link to={props.to} className="nav-link" activeClassName="active">
        {props.icon && (
          <i className={`fa fa-fw fa-${props.icon}`} />
        )}
        <span className="sinc-top-nav__menu-text">{props.text}</span>
      </Link>
    </li>
  );
}
