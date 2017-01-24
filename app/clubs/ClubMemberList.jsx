import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GenericErrorMessage, MemberTable, PageLoading } from '../shared';
import { fetchClubMemberList } from './actions';

class ClubMemberList extends Component {

  componentDidMount() {
    const { profile } = this.props;
    if (profile && profile.club) {
      this.fetchMembers(profile.club.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      const { profile } = nextProps;
      this.fetchMembers(profile.club.id);
    }
  }

  fetchMembers(cid) {
    this.props.fetchClubMemberList(cid);
  }

  render() {
    const { errorMsg, profile, members } = this.props;
    if (errorMsg) {
      return (<GenericErrorMessage error={errorMsg} />);
    }
    if (!(profile && members)) {
      return (<PageLoading />);
    }

    // TODO: Set 'scope' to whatever scope the user is viewing (e.g., club, region, etc.)
    const scope = profile.club.name;

    return (
      <div>
        <h1 className="sinc-page-header">Search current members ({scope})</h1>
        <MemberTable rows={members} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.profile,
    members: state.clubs.memberList,
  };
}

export default connect(mapStateToProps, { fetchClubMemberList })(ClubMemberList);
