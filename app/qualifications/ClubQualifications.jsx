import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import GenericErrorMessage from '../shared/GenericErrorMessage';
import PageLoading from '../shared/PageLoading';
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
              <th>CFT #</th>
              <th>Name</th>
              <th>Qualification</th>
              <th>Date granted</th>
            </tr>
          </thead>
          <tbody>
            {qualifications.map((qual, i) => (
              <tr key={i + 1}>
                <td className="sinc-club-qualifications__user-id">{qual.user.id}</td>
                <td>{qual.user.first_name} {qual.user.last_name}</td>
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
