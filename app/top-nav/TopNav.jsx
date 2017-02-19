import React from 'react';
import { connect } from 'react-redux';

import * as paths from '../paths';

import TopNavItem from './TopNavItem';

function TopNav(props) {
  const { profile } = props;
  return (
    <nav className="navbar navbar-toggleable-sm navbar-inverse sinc-top-nav">
      <button
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
        className="navbar-toggler"
        data-target="#js-navbar-nav-dropdown"
        data-toggle="collapse"
        type="button"
      >
        <i className="fa fa-fw fa-bars" />
      </button>
      <div className="collapse navbar-collapse" id="js-navbar-nav-dropdown">
        <ul className="navbar-nav">
          <TopNavItem to="/Main" icon="home" text="Home" />
          <TopNavItem to={paths.HELP_PAGE} icon="question" text="Help" />
          <TopNavItem to={paths.CONTACT_US} icon="envelope" text="Contact Us" />
        </ul>
        <div className="justify-content-md-end">
          <ul className="navbar-nav">
            {profile && (
              <TopNavItem
                icon="user"
                text={`${profile.first_name} ${profile.last_name}`}
                to={paths.EDIT_PROFILE}
              />
            )}
            <TopNavItem to={paths.LOGOUT} icon="sign-out" text="Logout" />
          </ul>
        </div>
      </div>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.profile,
  };
}

export default connect(mapStateToProps)(TopNav);
