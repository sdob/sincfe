import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageError from '../shared/PageError';
import PageLoading from '../shared/PageLoading';
import fetchCurrentMembers from './actions';

class SearchCurrentMembers extends Component {

  componentDidMount() {
    const { profile } = this.props;
    if (profile && profile.club) {
      this.props.fetchCurrentMembers(profile.club.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      const { profile } = nextProps;
      this.props.fetchCurrentMembers(profile.club.id);
    }
  }

  render() {
    const { error, profile, currentMembers } = this.props;
    if (error) {
      return (<PageError />);
    }
    if (!(profile && currentMembers.currentMembers)) {
      return (<PageLoading />);
    }

    const members = currentMembers.currentMembers;

    // TODO: Set 'scope' to whatever scope the user is viewing
    // (e.g., club, region, etc.)
    const scope = profile.club.name;

    return (
      <div>
        <h1 className="sinc-page-header">Search current members ({scope})</h1>
        <table className="table">
          <thead>
            <tr>
              <th>CFT #</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, i) => (
              <tr key={i}>
                <td>
                  {member.id}
                </td>
                <td>
                  {member.first_name}
                </td>
                <td>
                  {member.last_name}
                </td>
                <td>
                  {member.readable_committee_positions.join(', ')}
                </td>
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
    currentMembers: state.currentMembers,
  };
}

export default connect(mapStateToProps, { fetchCurrentMembers })(SearchCurrentMembers);
