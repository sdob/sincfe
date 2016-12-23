import React from 'react';
import { connect } from 'react-redux';
import NotImplementedYet from '../shared/NotImplementedYet';

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
    profile: state.auth.profile,
  };
}

export default connect(mapStateToProps)(OrganizeCourses);
