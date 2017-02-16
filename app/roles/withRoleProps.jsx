import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
 * This HOC ensures that 'isAdmin' and 'isDiveOfficer'
 * are exposed as props to the component it wraps
 */
export default function withRoleProps(WrappedComponent) {
  function WithRoleProps(props) {
    if (!props.profile) {
      return null;
    }
    const {
      profile: {
        is_staff,
        readable_committee_positions,
      }
    } = props;
    const isAdmin = !!is_staff;
    const isDiveOfficer = !!readable_committee_positions.includes('Dive Officer');
    return <WrappedComponent
      isAdmin={isAdmin}
      isDiveOfficer={isDiveOfficer}
      {...props}
    />;
  }

  function mapStateToProps(state) {
    const { profile } = state.profiles;
    return { profile };
  }

  return connect(mapStateToProps)(WithRoleProps);
}
