import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Table from 'reactabular-table';
import * as resolve from 'table-resolver';
import orderBy from 'lodash/orderBy';
import * as sort from 'sortabular';

import MemberTable from '../shared/MemberTable';
import PageError from '../shared/PageError';
import PageLoading from '../shared/PageLoading';
import fetchCurrentMembers from './actions';

class SearchCurrentMembers extends MemberTable {

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

    // TODO: Set 'scope' to whatever scope the user is viewing
    // (e.g., club, region, etc.)
    const scope = profile.club.name;

    const members = currentMembers.currentMembers;

    const rows = members;


    const { columns, sortingColumns } = this.state;
    const resolvedColumns = resolve.columnChildren({ columns });

    const sortedRows = compose(
      sort.sorter({
        columns: resolvedColumns,
        sortingColumns,
        sort: orderBy,
        strategy: sort.strategies.byProperty,
      }),
      resolve.resolve({
        columns: resolvedColumns,
        method: resolve.nested,
      })
    )(rows);

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
        {/*
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
        */}
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
