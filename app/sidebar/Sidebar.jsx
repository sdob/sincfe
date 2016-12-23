import React, { Component } from 'react';
import { connect } from 'react-redux';

import DivingOfficerOptions from './DivingOfficerOptions';
import TrainingOfficerOptions from './TrainingOfficerOptions';
import MemberOptions from './MemberOptions';
import TreasurerOptions from './TreasurerOptions';

class Sidebar extends Component {
  // Render the sidebar menu. This is made up of several submenus, which
  // contain links to actions that users with certain privileges can
  // take. So Dive Officers see the Dive Officer options, Treasurers
  // see the Treasurer options, and so on. The API server returns
  // a list of committee positions as part of the profile, so we'll
  // use that.
  //
  // A quick reminder here that even if a user manually edits the profile
  // object in local storage to give themselves these roles, nothing is
  // leaked, since privileges to access the data that populate the
  // destination pages are checked on the server independently. We're
  // just selectively showing/hiding these menus as a convenience to
  // the user.
  render() {
    const { profile } = this.props;

    // If the profile hasn't loaded yet, don't show anything.
    if (!profile) {
      return null;
    }

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
