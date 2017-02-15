import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LOGIN } from '../paths';

// This is a higher-order component that will redirect
// to the login route instead of its child component
// if we're not authenticated.
export default function (ComposedComponent) {
  class Authentication extends Component {

    constructor(props, ctx) {
      super(props, ctx);
      this.state = {
        isAdmin: false,
      };
    }

    // When the component mounts, if we're not authenticated,
    // redirect the user to the login page
    componentWillMount() {
      if (!this.props.authenticated) {
        return this.context.router.push(LOGIN);
      }
    }

    componentDidMount() {
      const { profile } = this.props;
      if (profile) {
        this.setState({
          isAdmin: profile.is_staff,
        });
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.profile !== this.props.profile) {
        this.setState({
          isAdmin: nextProps.profile.is_staff,
        });
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
      const { isAdmin } = this.state;
      return <ComposedComponent isAdmin={isAdmin} {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      profile: state.profiles.profile,
    };
  }

  return connect(mapStateToProps)(Authentication);
}
