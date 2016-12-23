import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import fetchQualifications from './actions';
import PageLoading from '../shared/PageLoading';

class Qualifications extends Component {

  componentDidMount() {
    if (this.props.profile && this.props.profile.id) {
      this.props.fetchQualifications(this.props.profile.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    // If we have a profile ID, then go get qualifications
    if (nextProps.profile !== this.props.profile) {
      this.props.fetchQualifications(nextProps.profile.id);
    }
  }

  render() {
    const { profile, qualifications } = this.props;

    // If we haven't received the props we're looking for, then
    // return null.
    // TODO: check whether there's been an error to explain why
    //       we haven't got the data we wanted
    if (!(profile && qualifications.qualifications)) {
      return (<PageLoading />);
    }

    return (
      <div>
        <h1 className="sinc-page-header">Your qualifications</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Qualification</th>
              <th>Date awarded</th>
            </tr>
          </thead>
          <tbody>
            {this.props.qualifications.qualifications.map((qual, i) => (
              <tr key={i + 1}>
                <td>{qual.certificate.name}</td><td>{moment(qual.date_granted).format('D MMM YYYY')}</td>
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
    profile: state.auth.profile,
    qualifications: state.memberQualifications,
  };
}

export default connect(mapStateToProps, { fetchQualifications })(Qualifications);
