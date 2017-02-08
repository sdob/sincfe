import React from 'react';

import { Link } from 'react-router';

export default function TopNavItem(props) {
  const { icon, text, to } = props;
  const className = generateClassName(props.className);

  return (
    <li className={className}>
      <Link to={to} className="nav-link" activeClassName="active">
        {icon && <i className={`fa fa-fw fa-${icon}`} />}
        {text && <span className="sinc-top-nav__menu-text">{text}</span>}
      </Link>
    </li>
  );
}

function generateClassName(className) {
  // Every <li> gets '.nav-item'; if we were passed a props.className,
  // then add it too.
  const base = ['nav-item'];
  if (typeof className !== 'undefined') {
    base.push(className);
  }
  return base.join(' ');
}
