import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchCurrentMembershipStatus from './actions';
import NotImplementedYet from '../shared/NotImplementedYet';

class MembershipHistory extends Component {

  componentDidMount() {
    if (this.props.profile && this.props.profile.id) {
      this.props.fetchCurrentMembershipStatus(this.props.profile.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      this.props.fetchCurrentMembershipStatus(nextProps.profile.id);
    }
  }

  render() {
    if (!this.props.currentMembershipStatus.currentMembershipStatus) {
      return null;
    }

    const status = this.props.currentMembershipStatus;

    return (
      <div>
        <h1 className="sinc-page-header">Membership history</h1>
        <h2 className="sinc-section-header">Current status</h2>
        <div className="row">
          <p className="col-xs-12 col-sm-4">
            Next year membership status
          </p>
          <p className="col-xs-12 col-sm-2">
            {status.currentMembershipStatus.next_year_membership_status}
          </p>
        </div>

        <div className="row">
          <p className="col-xs-12 col-sm-4">
            Current membership status
          </p>
          <p className="col-xs-12 col-sm-2">
            {status.currentMembershipStatus.current_membership_status}
          </p>
          <p className="col-xs-12 col-sm-4">
            Your water fitness test is due on
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(status.currentMembershipStatus.next_fitness_test_due_date).format('D MMM YYYY')}
          </p>
        </div>

        <div className="row">
          <p className="col-xs-12 col-sm-4">
            You have been a member since
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(status.currentMembershipStatus.member_since).format('D MMM YYYY')}
          </p>
          <p className="col-xs-12 col-sm-4">
            Your next medical disclaimer is due on
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(status.currentMembershipStatus.next_medical_disclaimer_due_date).format('D MMM YYYY')}
          </p>
        </div>

        <div className="row">
          <p className="col-xs-12 col-sm-4">
            Your next renewal is due on
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(status.currentMembershipStatus.next_renewal_due_date).format('D MMM YYYY')}
          </p>
          <p className="col-xs-12 col-sm-4">
            Your next medical assessment is due on
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(status.currentMembershipStatus.next_medical_assessment_due_date).format('D MMM YYYY')}
          </p>
        </div>

        <h2 className="sinc-section-header">Membership history</h2>
        <NotImplementedYet />

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
    currentMembershipStatus: state.currentMembershipStatus,
  };
}

export default connect(mapStateToProps, { fetchCurrentMembershipStatus })(MembershipHistory);
