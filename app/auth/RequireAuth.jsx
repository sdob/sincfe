import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LOGIN_ROUTE } from '../constants';

// This is a wrapper component that will redirect
// to the login route instead of its child component
// if we're not authenticated.
export default function (ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push(LOGIN_ROUTE);
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push(LOGIN_ROUTE);
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
