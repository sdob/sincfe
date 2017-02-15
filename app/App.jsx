import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProfile } from './profiles/actions';

import Header from './header/Header';
import Login from './pages/Login';
import { ModalBackdrop, ModalRoot } from './modals';
import NotificationContainer from './notifications/NotificationContainer';

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
function renderAuthenticated(props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-4 col-lg-3">
          <Sidebar />
        </div>
        <div className="col-12 col-md-8 col-lg-9">
          {props.children}
        </div>
      </div>
    </div>
  );
}

// Top-level component.
class App extends Component {

  // When the main app component mounts,
  // if the user is authenticated, retrieve
  // their profile from the back-end
  componentDidMount() {
    if (this.props.authenticated) {
      // If we're authenticated, retrieve the user's profile
      this.props.fetchProfile();
    } else {
      // If the user isn't authenticated, then nuke any paths beyond the
      // app root
      this.context.router.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    // App has mounted but user may be logging in; check whether
    // the user is authenticated
    if (!this.props.authenticated && nextProps.authenticated) {
      // If we're authenticated, retrieve the user's profile
      this.props.fetchProfile();
    }
  }

  // Render the app. We're rendering either of two things here: the
  // main app (if the user is authenticated), or the login page
  // (if not)
  render() {
    // Handle modal backdrop here
    const { showBackdrop } = this.props;
    if (showBackdrop) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return (
      <div>
        <ModalRoot />
        <NotificationContainer />
        <Header />
        { this.props.authenticated ? renderAuthenticated(this.props) : renderLoginPage() }
        {showBackdrop && <ModalBackdrop />}
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { authenticated } = state.auth;
  const { showBackdrop } = state.modal;
  const { profile } = state.profiles;
  return { authenticated, profile, showBackdrop };
}

export default connect(mapStateToProps, { fetchProfile })(App);
