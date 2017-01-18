import React, { Component } from 'react';
import { compose } from 'redux';
import orderBy from 'lodash/orderBy';
import * as resolve from 'table-resolver';
import * as sort from 'sortabular';

export default class MemberTable extends Component {
  static sortedRows(rows, resolvedColumns, sortingColumns) {
    return compose(
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
  }

  constructor(props) {
    super(props);

    const getSortingColumns = () => this.state.sortingColumns || {};

    const resetable = sort.reset({
      event: 'onDoubleClick',
      getSortingColumns,
      onReset: ({ sortingColumns }) => this.setState({ sortingColumns }),
      strategy: sort.strategies.byProperty,
    });

    const sortable = sort.sort({
      getSortingColumns,

      onSort: (selectedColumn) => {
        this.setState({
          sortingColumns: sort.byColumn({
            sortingColumns: this.state.sortingColumns,
            selectedColumn
          }),
        });
      },

      strategy: sort.strategies.byProperty,
    });

    this.state = {
      sortingColumns: {
        id: {
          direction: 'desc',
          position: 0,
        },
        first_name: {
          direction: 'none',
          position: 1,
        },
        last_name: {
          direction: 'none',
          position: 2,
        },
      },

      columns: [
        {
          property: 'id',
          header: {
            label: 'CFT number',
            transforms: [resetable],
            formatters: [
              sort.header({
                sortable,
                getSortingColumns,
                strategy: sort.strategies.byProperty,
              }),
            ],
          },
        },
        {
          property: 'first_name',
          header: {
            label: 'First name',
            transforms: [resetable],
            formatters: [
              sort.header({
                sortable,
                getSortingColumns,
                strategy: sort.strategies.byProperty,
              }),
            ],
          },
        },
        {
          property: 'last_name',
          header: {
            label: 'Last name',
            transforms: [resetable],
            formatters: [
              sort.header({
                sortable,
                getSortingColumns,
                strategy: sort.strategies.byProperty,
              }),
            ],
          },
        },
        {
          property: 'email',
          header: {
            label: 'Email',
          },
          cell: {
            formatters: [
              email => <a href={`mailto:${email}`}>{email}</a>,
            ],
          },
        }
      ],
    };
  }
}
