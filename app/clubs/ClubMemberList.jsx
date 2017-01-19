import React from 'react';
import { connect } from 'react-redux';
import * as Table from 'reactabular-table';
import * as resolve from 'table-resolver';

import MemberTable from '../shared/MemberTable';
import PageError from '../shared/PageError';
import PageLoading from '../shared/PageLoading';
import { fetchClubMemberList } from './actions';

class ClubMemberList extends MemberTable {

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
    const { error, profile, members } = this.props;
    if (error) {
      return (<PageError />);
    }
    if (!(profile && members)) {
      return (<PageLoading />);
    }

    // TODO: Set 'scope' to whatever scope the user is viewing
    // (e.g., club, region, etc.)
    const scope = profile.club.name;

    const { columns, sortingColumns } = this.state;
    const resolvedColumns = resolve.columnChildren({ columns });

    const sortedRows = MemberTable.sortedRows(members, resolvedColumns, sortingColumns);

    return (
      <div>
        <h1 className="sinc-page-header">Search current members ({scope})</h1>
        <Table.Provider
          className="table pure-table pure-table-striped"
          columns={columns}
        >
          <Table.Header
            headerRows={resolve.headerRows({ columns })}
          />
          <Table.Body rows={sortedRows} rowKey="id" />
        </Table.Provider>
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
