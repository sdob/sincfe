import React, { Component } from 'react';
import { connect } from 'react-redux';

import DivingOfficerOptions from './DivingOfficerOptions';
import TrainingOfficerOptions from './TrainingOfficerOptions';
import MemberOptions from './MemberOptions';
import TreasurerOptions from './TreasurerOptions';

class Sidebar extends Component {
  render() {
    if (!this.props.profile) {
      return null;
    }

    const { profile } = this.props;
    return (
      <div>
        {profile.readable_committee_positions.includes('Dive Officer') && <DivingOfficerOptions />}
        {profile.readable_committee_positions.includes('Training Officer') && <TrainingOfficerOptions />}
        {profile.readable_committee_positions.includes('Treasurer') && <TreasurerOptions />}
        <MemberOptions />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
  };
}

export default connect(mapStateToProps)(Sidebar);
