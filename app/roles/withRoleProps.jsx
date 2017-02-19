import React from 'react';
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

    /* We didn't define this identifier (the API did) so we're not
     * worrying about conforming to the style guide.
     */
    // eslint-disable-next-line camelcase
    const isAdmin = !!is_staff;
    const isDiveOfficer = !!readable_committee_positions.includes('Dive Officer');

    const roles = {
      isAdmin,
      isDiveOfficer,
    };

    return (
      <WrappedComponent
        roles={roles}
        {...props}
      />
    );
  }

  function mapStateToProps(state) {
    const { profile } = state.profiles;
    return { profile };
  }

  return connect(mapStateToProps)(WithRoleProps);
}
