import React from 'react';
import { connect } from 'react-redux';

import * as paths from '../paths';

import TopNavItem from './TopNavItem';

function TopNav(props) {
  const { profile } = props;
  return (
    <nav className="navbar navbar-dark bg-cft-dark sinc-top-nav">
      <ul className="nav navbar-nav">
        <TopNavItem to="/Main" icon="home" text="Home" />
        <TopNavItem to={paths.HELP_PAGE} icon="question" text="Help" />
        <TopNavItem to={paths.CONTACT_US} icon="envelope" text="Contact Us" />
        <TopNavItem to={paths.LOGOUT} icon="sign-out" className="float-xs-right" text="Logout" />
        {profile && (
          <TopNavItem
            className="float-xs-right"
            icon="user"
            text={`${profile.first_name} ${profile.last_name}`}
            to={paths.EDIT_PROFILE}
          />
        )}
      </ul>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.profile,
  };
}

export default connect(mapStateToProps)(TopNav);
