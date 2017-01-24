import React, { Component } from 'react';
import { Link } from 'react-router';
import * as sort from 'sortabular';
import SortedTable from './SortedTable';

// Handle state and sorting for SortableTable
export default class NewMemberTable extends Component {

  constructor(props, ctx) {
    super(props, ctx);

    // Do some boilerplate Reactabular stuff that isn't very well
    // explained in the documentation
    const getSortingColumns = this.getSortingColumns.bind(this);
    const strategy = sort.strategies.byProperty;
    const resetable = sort.reset({
      event: 'onDoubleClick',
      getSortingColumns,
      onReset: ({ sortingColumns }) => this.setState({ sortingColumns }),
      strategy,
    });
    const sortable = sort.sort({
      getSortingColumns,
      strategy,
      onSort: (selectedColumn) => {
        this.setState({
          sortingColumns: sort.byColumn({
            sortingColumns: this.state.sortingColumns,
            selectedColumn,
          }),
        });
      },
    });

    // Define our columns
    const columns = [
      // Our sorting columns are all defined very similarly
      defaultColumnDefinition('id', 'CFT number'),
      defaultColumnDefinition('first_name', 'First name'),
      defaultColumnDefinition('last_name', 'Last name'),
      // Email column: not sortable
      {
        property: 'email',
        header: { label: 'Email' },
        cell: {
          formatters: [
            email => <a href={`mailto:${email}`}>{email}</a>,
          ],
        },
      },
      // Actions column: not sortable
      {
        property: 'id',
        header: { label: 'Action' },
        cell: {
          formatters: [
            id => (
              <Link href={`/edit-member/${id}/`}>
                <i className="fa fa-fw fa-edit" />
              </Link>
            ),
          ],
        },
      },
    ];

    // We'll allow searching on all columns
    const searchingColumns = columns;

    // These are the columns on which we allow sorting
    const sortingColumns = {
      id: { direction: 'desc', position: 0 },
      first_name: { direction: 'none', position: 1 },
      last_name: { direction: 'none', position: 2 },
    };

    // Initialize state
    this.state = { columns, searchingColumns, sortingColumns };

    function defaultColumnDefinition(property, label) {
      // A few of our column definitions are identical except for their
      // properties and labels, so we lift the definition out into this
      // function for the sake of terseness
      return {
        property,
        header: {
          label,
          transforms: [resetable],
          formatters: [
            sort.header({ getSortingColumns, sortable, strategy })
          ],
        },
      };
    }
  }

  getSortingColumns() {
    return this.state.sortingColumns || {};
  }

  render() {
    const { rows } = this.props;
    const { columns, searchingColumns, sortingColumns } = this.state;
    return (
      <SortedTable
        columns={columns}
        rows={rows}
        searchingColumns={searchingColumns}
        sortingColumns={sortingColumns}
      />
    );
  }

}
