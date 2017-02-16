import React, { Component } from 'react';

function withRole(ConnectedComponent) {
  return connect(mapStateToProps)(RoleCheck);

  class RoleCheck extends Component {
    render() {
      return <ConnectedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {};
  }
}
