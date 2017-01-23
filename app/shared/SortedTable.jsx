import React, { Component } from 'react';
import { compose } from 'redux';
import orderBy from 'lodash/orderBy';
import * as Table from 'reactabular-table';
import * as resolve from 'table-resolver';
import * as search from 'searchtabular';
import * as sort from 'sortabular';

// SortedTable handles its own state w.r.t. filtering; this doesn't need
// to be persistent.
export default class SortedTable extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      query: {},
    };
  }

  render() {
    const { query } = this.state;
    const { columns, rows, sortingColumns, searchingColumns } = this.props;
    const resolvedColumns = resolve.columnChildren({ columns });
    const sortedRows = getSortedRows(rows, resolvedColumns, sortingColumns);
    // Filter the visible rows by search terms
    const searchedRows = search.multipleColumns({
      columns: searchingColumns,
      query,
    })(sortedRows);

    return (
      <Table.Provider
        className="table pure-table pure-table-striped"
        columns={columns}
      >
        <search.Columns
          columns={searchingColumns}
          query={query}
          onChange={query => this.setState({query})}
        />
        <Table.Header
          headerRows={resolve.headerRows({ columns })}
        />
        <Table.Body rows={searchedRows} rowKey="id" />
      </Table.Provider>
    );
  }
}

// I don't pretend to understand this; it's ripped from the sortabular
// docs.
function getSortedRows(rows, columns, sortingColumns) {
  return compose(
    sort.sorter({
      columns,
      sortingColumns,
      sort: orderBy,
      strategy: sort.strategies.byProperty,
    }),
    resolve.resolve({
      columns,
      method: resolve.nested,
    })
  )(rows);
}
