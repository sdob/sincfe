import React from 'react';
import { connect } from 'react-redux';
import NotImplementedYet from '../shared/NotImplementedYet';

function Documents() {
  return (
    <div>
      <h1 className="sinc-page-header">Documents</h1>
      <NotImplementedYet />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.profile,
  };
}

export default connect(mapStateToProps)(Documents);
