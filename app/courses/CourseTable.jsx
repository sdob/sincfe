import React, { Component } from 'react';
import { Link } from 'react-router';
import * as sort from 'sortabular';
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

    const columns = [
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
            <Link to={`paths.EDIT_COURSE/${id}`} title="Edit">
              <i className="fa fa-fw fa-edit" />
            </Link>
          )],
        },
      },
    ];

    const unsearchableProperties = ['region.name'];
    // const searchingColumns = columns.filter(c => !unsearchableProperties.includes(c.property));
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
    const { rows } = this.props;
    const { columns, searchingColumns, sortingColumns } = this.state;
    console.info(columns);
    console.info(searchingColumns);
    console.info(sortingColumns);
    // console.info('rows?');
    // console.info(rows);
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
