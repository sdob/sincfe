import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import * as Table from 'reactabular-table';
import * as resolve from 'table-resolver';
import * as sort from 'sortabular';

import fetchActiveInstructors from './actions';
import PageLoading from '../shared/PageLoading';
import MemberTable from '../shared/MemberTable';

class ActiveInstructors extends MemberTable {
  componentDidMount() {
    const { profile } = this.props;
    if (profile) {
      this.props.fetchActiveInstructors(profile.club.region.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      this.props.fetchActiveInstructors(nextProps.profile.club.region.id);
    }
  }

  render() {
    const { instructors, profile } = this.props;
    if (!instructors) {
      return <PageLoading />;
    }
    // TODO: Set this to the appropriate scope (club, region, etc.)
    const scope = profile.club.region.name;

    const rows = instructors;

    const { columns, sortingColumns } = this.state;
    const resolvedColumns = resolve.columnChildren({ columns });

    const sortedRows = this.sortedRows(rows, resolvedColumns, sortingColumns);

    return (
      <div>
        <h1>Active Instructors ({scope})</h1>
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
    instructors: state.activeInstructors.instructors,
    profile: state.profiles.profile,
  };
}

export default connect(mapStateToProps, { fetchActiveInstructors })(ActiveInstructors);
