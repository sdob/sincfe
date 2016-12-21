import React from 'react';
import { connect } from 'react-redux';

import TopNav from '../top-nav/TopNav';

function Header(props) {
  return (
    <div className="header">
      <div className="media">

        <div className="media-left media-middle">
          <a href="/">
            <img
              className="media-object"
              height="120px"
              alt="IUC logo"
              src="/img/CFT_logo1.png"
            />
          </a>
        </div>

        <div className="media-body media-middle header-text">
          <h1 className="media-heading header-title">
            <span>Comhairle Fó-Thuinn</span>
            <span className="header-subtitle">Irish Underwater Council</span>
          </h1>
        </div>

      </div>
      {props.authenticated && <TopNav />}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(Header);
