import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { PageLoading } from '../shared';

class Logout extends Component {
  componentDidMount() {
    this.props.logoutUser();
  }

  render() {
    return (
      <PageLoading message="Logging out..." />
    );
  }
}

export default connect(null, actions)(Logout);
