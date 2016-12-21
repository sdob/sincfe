import React from 'react';

import * as paths from '../paths';
import { LOGOUT_ROUTE } from '../constants';

import TopNavItem from './TopNavItem';

export default function TopNav() {
  return (
    <nav className="navbar navbar-dark bg-cft-dark sinc-top-nav">
      <ul className="nav navbar-nav">
        <TopNavItem to="/Main" icon="home" text="Home" />
        <TopNavItem to={paths.HELP_PAGE} icon="question" text="Help" />
        <TopNavItem to={paths.CONTACT_US} icon="envelope" text="Contact Us" />
        <TopNavItem to={LOGOUT_ROUTE} icon="sign-out" className="float-xs-right" text="Logout" />
      </ul>
    </nav>
  );
}
