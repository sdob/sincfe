import React from 'react';
import { connect } from 'react-redux';
import { NotImplementedYet } from '../shared';

function OrganizeCourses() {
  return (
    <div>
      <h1 className="sinc-page-header">Organize courses</h1>
      <NotImplementedYet />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.profile,
  };
}

export default connect(mapStateToProps)(OrganizeCourses);
