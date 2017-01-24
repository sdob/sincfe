import React, { Component } from 'react';
import { connect } from 'react-redux';
import MemberTable from '../shared/MemberTable';
import PageLoading from '../shared/PageLoading';
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

    console.info(members);

    return (
      <div>
        <h1 className="sinc-page-header">View members</h1>
        <MemberTable rows={members} />
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
