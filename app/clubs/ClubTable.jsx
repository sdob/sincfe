import React, { Component } from 'react';
import * as sort from 'sortabular';
import { Link } from 'react-router';
import { EDIT_CLUB } from '../paths';
import { SortedTable } from '../shared';

export default class ClubTable extends Component {
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
          sortingColumns: sort.byColumn({
            sortingColumns: this.state.sortingColumns,
            selectedColumn,
          }),
        });
      }
    });

    this.state = {
      sortingColumns: {
        name: { direction: 'desc', position: 0 },
        region: { direction: 'none', position: 1 },
      },
      columns: [
        {
          property: 'name',
          header: {
            label: 'Name',
            transforms: [resetable],
            formatters: [
              sort.header({ getSortingColumns, sortable, strategy }),
            ],
          },
        },
      ],
    };

    /* Add optional columns, depending on values passed in by props */

    // showRegions defaults to true
    const showRegions = this.props.showRegions === undefined ? true : this.props.showRegions;
    if (showRegions) {
      this.state.columns.push(
        {
          property: 'region.name',
          header: {
            label: 'Region',
            transforms: [resetable],
          },
        },
      );
    }

    // editable defaults to false (as does isAdmin)
    const editable = !!this.props.editable;
    const isAdmin = !!this.props.isAdmin;
    const { handleDelete } = this.props;
    if (editable) {
      this.state.columns.push({
        property: 'id',
        header: {
          label: 'Action',
        },
        cell: {
          formatters: [id => (
            <div>
              <Link
                className="btn btn-primary sinc-btn--compact"
                to={`${EDIT_CLUB}/${id}`}
              >
                <i className="fa fa-fw fa-edit" />
              </Link>
            </div>
          )],
        }
      });
    }

  }

  getSortingColumns() {
    return this.state.sortingColumns || {};
  }

  render() {
    const { clubs } = this.props;
    const { columns, sortingColumns } = this.state;
    const searchableProperties = ['name'];
    const searchingColumns = columns.filter(col => searchableProperties.includes(col.property));
    return (
      <SortedTable
        columns={columns}
        rows={clubs}
        searchingColumns={searchingColumns}
        sortingColumns={sortingColumns}
      />
    );
  }
}
