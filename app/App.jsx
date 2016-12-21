import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProfile } from './auth/actions';

import Header from './header/Header';
import Login from './pages/Login';

import Sidebar from './sidebar/Sidebar';

// If the user isn't authenticated, we'll
// just show them the login page
function renderLoginPage() {
  return (
    <Login />
  );
}

// If the user is authenticated, we'll show them
// the top nav, the sidebar, and whatever component
// the route has sent them to
function renderAuthenticated() {
  return (
    <div className="container-fluid">
      <div className="col-sm-4 col-md-3">
        <Sidebar />
      </div>
      <div className="col-sm-8 col-md-9">
        {this.props.children}
      </div>
    </div>
  );
}

// Top-level component.
class App extends Component {

  // When the main app component mounts,
  // if the user is authenticated, retrieve
  // their profile from the back-end
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.fetchProfile();
    }
  }

  render() {
    return (
      <div>
        <Header />
        { this.props.authenticated ? renderAuthenticated() : renderLoginPage() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    profile: state.auth.profile,
  };
}

export default connect(mapStateToProps, { fetchProfile })(App);
