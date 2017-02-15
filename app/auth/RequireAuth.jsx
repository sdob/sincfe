import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LOGIN } from '../paths';

// This is a higher-order component that will redirect
// to the login route instead of its child component
// if we're not authenticated.
export default function (ComposedComponent) {
  class Authentication extends Component {

    // When the component mounts, if we're not authenticated,
    // redirect the user to the login page
    componentWillMount() {
      if (!this.props.authenticated) {
        return this.context.router.push(LOGIN);
      }
    }

    // When the props update, check to see whether we're still authenticated;
    // if we're logged out, then redirect the user to the login page
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        return this.context.router.push(LOGIN);
      }
    }

    // Render: return the component that we're wrapping
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
