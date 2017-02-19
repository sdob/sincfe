import React, { Component } from 'react';
import { Link } from 'react-router';
import * as sort from 'sortabular';
import * as paths from '../paths';
import { SortedTable } from '../shared';

export default class CourseTable extends Component {

  constructor(props, ctx) {
    super(props, ctx);

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
          sortingColumns: this.state.sortingColumns,
          selectedColumn,
        });
      },
    });

    const defaultColumns = [
      {
        property: 'id',
        header: {
          label: 'Number',
          transforms: [resetable],
          formatters: [sort.header({ getSortingColumns, sortable, strategy })],
        },
      },
      {
        property: 'certificate.name',
        header: {
          label: 'Name',
          transforms: [resetable],
          formatters: [sort.header({ getSortingColumns, sortable, strategy })],
        },
      },
      {
        property: 'organizer.full_name',
        header: {
          label: 'Organizer',
          transforms: [resetable],
          formatters: [sort.header({ getSortingColumns, sortable, strategy })],
        },
      },
      {
        property: 'region.name',
        header: {
          label: 'Region',
        },
      },
      {
        property: 'id',
        header: {
          label: 'Action',
        },
        cell: {
          formatters: [id => (
            <Link
              className="btn btn-primary sinc-btn sinc-btn--compact"
              to={`${paths.EDIT_COURSE}/${id}`}
              title="Edit"
            >
              <i className="fa fa-fw fa-edit" />
            </Link>
          )],
        },
      },
    ];

    // If we have a list of excluded columns, then don't show those;
    // otherwise show the default columns
    const { excludedColumns } = props;
    const columns = excludedColumns ? defaultColumns.filter(c => (
      !excludedColumns.includes(c.property)
    )) : defaultColumns;

    const searchingColumns = [];
    const sortingColumns = {
      id: { direction: 'desc', position: 0 },
      certificate: { direction: 'none', position: 1 },
    };

    this.state = {
      columns,
      searchingColumns,
      sortingColumns,
    };
  }

  getSortingColumns() {
    return this.state.sortingColumns || {};
  }

  render() {
    const rows = this.props.rows.map(row => ({
      ...row,
      organizer: {
        ...row.organizer,
        full_name: `${row.organizer.first_name} ${row.organizer.last_name}`,
      },
    }));
    const { columns, searchingColumns, sortingColumns } = this.state;
    return (
      <div>
        <SortedTable
          columns={columns}
          searchingColumns={searchingColumns}
          sortingColumns={sortingColumns}
          rows={rows}
        />
      </div>
    );
  }
}
