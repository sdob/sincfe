import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { GenericErrorMessage, PageLoading } from '../shared';
import { fetchClubQualifications } from './actions';

class ClubQualifications extends Component {

  componentDidMount() {
    const { profile } = this.props;
    if (profile && profile.club) {
      this.props.fetchClubQualifications(profile.club.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      this.props.fetchClubQualifications(nextProps.profile.club.id);
    }
  }

  render() {
    const { errorMsg, profile, qualifications } = this.props;

    if (errorMsg) {
      return <GenericErrorMessage error={errorMsg} />;
    }

    // Display a spinner while we're loading
    if (!(profile && qualifications)) {
      return <PageLoading />;
    }

    return (
      <div>
        <h1 className="sinc-page-header">Club qualifications</h1>
        <table className="table">
          <thead>
            <tr>
              <th>CFT number</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Qualification</th>
              <th>Date granted</th>
            </tr>
          </thead>
          <tbody>
            {qualifications.map(qual => (
              <tr key={qual.id}>
                <td>{qual.user.id}</td>
                <td>{qual.user.first_name}</td>
                <td>{qual.user.last_name}</td>
                <td>{qual.certificate.name}</td>
                <td>{moment(qual.date_granted).format('D MMM YYYY')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.profile,
    qualifications: state.qualifications.qualifications,
    errorMsg: state.qualifications.errorMsg,
  };
}

export default connect(mapStateToProps, { fetchClubQualifications })(ClubQualifications);
