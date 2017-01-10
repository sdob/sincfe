import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchCurrentMembershipStatus from './actions';
import GenericErrorMessage from '../shared/GenericErrorMessage';
import NotImplementedYet from '../shared/NotImplementedYet';

const CURRENT = 'Current';

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

  showCurrentMembershipStatus(status) {
    if (status === CURRENT) {
      return <i className="fa fa-fw fa-check-circle text-success" />;
    }
    return <i className="fa fa-fw fa-times-circle text-danger" />;
  }

  render() {
    const { errorMsg, status } = this.props;

    if (errorMsg) {
      return <GenericErrorMessage error={errorMsg} />;
    }

    if (!status) {
      return null;
    }

    // Destructure the status object, for brevity's sake
    const {
      current_membership_status,
      member_since,
      next_fitness_test_due_date,
      next_medical_assessment_due_date,
      next_medical_disclaimer_due_date,
      next_renewal_due_date,
    } = status;

    return (
      <div>
        <h1 className="sinc-page-header">Membership history</h1>
        <h2 className="sinc-section-header">Current status</h2>

        <div className="row">
          <p className="col-xs-12 col-sm-4 sinc-membership-status__key">
            Current membership status
          </p>
          <p className="col-xs-12 col-sm-2">
            {current_membership_status} {this.showCurrentMembershipStatus(current_membership_status)}
          </p>
          <p className="col-xs-12 col-sm-4 sinc-membership-status__key">
            Your water fitness test is due on
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(next_fitness_test_due_date).format('D MMM YYYY')}
          </p>
        </div>

        <div className="row">
          <p className="col-xs-12 col-sm-4 sinc-membership-status__key">
            You have been a member since
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(member_since).format('D MMM YYYY')}
          </p>
          <p className="col-xs-12 col-sm-4 sinc-membership-status__key">
            Your next medical disclaimer is due on
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(next_medical_disclaimer_due_date).format('D MMM YYYY')}
          </p>
        </div>

        <div className="row">
          <p className="col-xs-12 col-sm-4 sinc-membership-status__key">
            Your next renewal is due on
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(next_renewal_due_date).format('D MMM YYYY')}
          </p>
          <p className="col-xs-12 col-sm-4 sinc-membership-status__key">
            Your next medical assessment is due on
          </p>
          <p className="col-xs-12 col-sm-2">
            {moment(next_medical_assessment_due_date).format('D MMM YYYY')}
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
    errorMsg: state.membershipStatus.errorMsg,
  };
}

export default connect(mapStateToProps, { fetchCurrentMembershipStatus })(MembershipHistory);
