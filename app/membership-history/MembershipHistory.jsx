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
    const { status } = this.props;

    if (!status) {
      return null;
    }

    return (
      <div>
        <h1 className="sinc-page-header">Membership history</h1>
        <h2 className="sinc-section-header">Current status</h2>

        <div className="row">
          <p className="col-xs-12 col-sm-4 sinc-membership-status__key">
            Next year membership status
          </p>
          <p className="col-xs-12 col-sm-2">
            {status.next_year_membership_status}
          </p>
        </div>

        <div className="row">
          <p className="col-xs-12 col-sm-4 sinc-membership-status__key">
            Current membership status
          </p>
          <p className="col-xs-12 col-sm-2">
            {status.current_membership_status}
          </p>
          <p className="col-xs-12 col-sm-4 sinc-membership-status__key">
            Your water fitness test is due on
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(status.next_fitness_test_due_date).format('D MMM YYYY')}
          </p>
        </div>

        <div className="row">
          <p className="col-xs-12 col-sm-4 sinc-membership-status__key">
            You have been a member since
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(status.member_since).format('D MMM YYYY')}
          </p>
          <p className="col-xs-12 col-sm-4 sinc-membership-status__key">
            Your next medical disclaimer is due on
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(status.next_medical_disclaimer_due_date).format('D MMM YYYY')}
          </p>
        </div>

        <div className="row">
          <p className="col-xs-12 col-sm-4 sinc-membership-status__key">
            Your next renewal is due on
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(status.next_renewal_due_date).format('D MMM YYYY')}
          </p>
          <p className="col-xs-12 col-sm-4 sinc-membership-status__key">
            Your next medical assessment is due on
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(status.next_medical_assessment_due_date).format('D MMM YYYY')}
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
    profile: state.profiles.profile,
    status: state.membershipStatus.currentStatus,
  };
}

export default connect(mapStateToProps, { fetchCurrentMembershipStatus })(MembershipHistory);
