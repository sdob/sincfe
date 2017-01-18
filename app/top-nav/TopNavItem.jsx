import React from 'react';

import { Link } from 'react-router';

export default function TopNavItem(props) {
  const { className, icon, text, to } = props;
  const liClasses = generateClassString(className);

  return (
    <li className={liClasses}>
      <Link to={to} className="nav-link" activeClassName="active">
        {icon && <i className={`fa fa-fw fa-${icon}`} />}
        {text && <span className="sinc-top-nav__menu-text">{text}</span>}
      </Link>
    </li>
  );
}

function generateClassString(className) {
  // Every <li> gets '.nav-item'; if we were passed a props.className,
  // then add it too.
  const classStrings = ['nav-item'];
  if (typeof className !== 'undefined') {
    classStrings.push(className);
  }
  return classStrings.join(' ');
}
