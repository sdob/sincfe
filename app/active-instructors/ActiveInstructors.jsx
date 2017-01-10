import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import * as Table from 'reactabular-table';
import * as resolve from 'table-resolver';
import * as sort from 'sortabular';

import fetchActiveInstructors from './actions';
import { fetchRegionDetail } from '../regions/actions';
import PageLoading from '../shared/PageLoading';
import MemberTable from '../shared/MemberTable';

class ActiveInstructors extends MemberTable {
  componentDidMount() {
    const { profile } = this.props;
    if (profile) {
      const { region } = profile.club;
      this.props.fetchActiveInstructors(region);
      this.props.fetchRegionDetail(region);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      const { region } = nextProps.profile.club;
      this.props.fetchActiveInstructors(region);
      this.props.fetchRegionDetail(region);
    }
  }

  render() {
    const { instructors, profile, region } = this.props;
    if (!instructors) {
      return <PageLoading />;
    }

    const rows = instructors;

    const { columns, sortingColumns } = this.state;
    const resolvedColumns = resolve.columnChildren({ columns });

    const sortedRows = this.sortedRows(rows, resolvedColumns, sortingColumns);

    return (
      <div>
        <h1>Active Instructors ({region && region.name})</h1>
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
    region: state.regions.regionDetail,
  };
}

export default connect(mapStateToProps, { fetchActiveInstructors, fetchRegionDetail })(ActiveInstructors);
