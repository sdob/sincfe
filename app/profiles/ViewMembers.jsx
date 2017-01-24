import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MemberTable, PageLoading } from '../shared';
import { fetchMembers } from './actions';

class ViewMembers extends Component {

  componentDidMount() {
    this.props.fetchMembers();
  }

  render() {
    const { members } = this.props;
    if (!members) {
      return (
        <div>
          <h1 className="sinc-page-header">View members</h1>
          <PageLoading />
        </div>
      );
    }

    // Because this is an admin view, there are members from many
    // clubs and regions. Add these as columns in the MemberTable.
    const extraColumns = {
      'club.name': { label: 'Club', canBeSorted: true },
      'club.region.name': { label: 'Region', canBeSorted: true },
    };
    return (
      <div>
        <h1 className="sinc-page-header">View members</h1>
        <MemberTable
          extraColumns={extraColumns}
          rows={members}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { members } = state.profiles;
  return {
    members,
  };
}

export default connect(mapStateToProps, { fetchMembers })(ViewMembers);
