import React from 'react';
import { compose } from 'redux';
import orderBy from 'lodash/orderBy';
import * as Table from 'reactabular-table';
import * as resolve from 'table-resolver';
import * as sort from 'sortabular';

// This actually doesn't need any state, so pure function it is.
export default function SortedTable(props) {
  const { columns, rows, sortingColumns } = props;
  const resolvedColumns = resolve.columnChildren({ columns });
  const sortedRows = getSortedRows(rows, resolvedColumns, sortingColumns);

  return (
    <Table.Provider
      className="table pure-table pure-table-striped"
      columns={columns}
    >
      <Table.Header
        headerRows={resolve.headerRows({ columns })}
      />
      <Table.Body rows={sortedRows} rowKey="id" />
    </Table.Provider>
  );
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
