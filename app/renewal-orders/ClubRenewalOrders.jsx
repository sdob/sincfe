import React from 'react';
import { connect } from 'react-redux';
import { NotImplementedYet } from '../shared';

function ClubRenewalOrders() {
  return (
    <div>
      <h1 className="sinc-page-header">Club renewal orders</h1>
      <NotImplementedYet />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.profile,
  };
}

export default connect(mapStateToProps)(ClubRenewalOrders);
