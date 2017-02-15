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

    // If we have been passed a dict of property -> label mappings,
    // we'll assume that they're searchable and sortable. This lets
    // us extend MemberTable for admin views.
    /*
    const extraColumns = props.columns.length ? Object.keys(props.columns).map((k) => {
      console.info(k);
      return defaultColumnDefinition(k, props.columns[k].label, props.columns[k].canBeSorted)
    }) : [];
    */
    const extraColumns = props.extraColumns ? Object.keys(props.extraColumns).map((prop) => {
      const label = props.extraColumns[prop].label;
      const canBeSorted = props.extraColumns[prop].canBeSorted;
      return defaultColumnDefinition(prop, label, canBeSorted);
    }) : [];

    // Define our columns
    const columns = [
      // Our sorting columns are defined very similarly
      defaultColumnDefinition('id', 'CFT number'),
      defaultColumnDefinition('name', 'Name'),
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
      ...extraColumns, // Add in our extra search/sort columns
      // Actions column: not sortable
      {
        property: 'id',
        header: { label: 'Action' },
        cell: {
          formatters: [
            id => (
              <Link
                className="btn btn-primary sinc-btn--compact"
                to={`/edit-member/${id}/`}
              >
                <i className="fa fa-fw fa-edit" />
              </Link>
            ),
          ],
        },
      },
    ];

    // We'll allow searching on all columns
    const unsearchableProperties = ['club.region.name'];
    const searchingColumns = columns.filter(col => !unsearchableProperties.includes(col.property));

    // These are the columns on which we allow sorting
    const sortingColumns = {
      id: { direction: 'desc', position: 0 },
      first_name: { direction: 'none', position: 1 },
      last_name: { direction: 'none', position: 2 },
    };

    // Initialize state
    this.state = { columns, searchingColumns, sortingColumns };

    function defaultColumnDefinition(property, label, canBeSorted = true) {
      // A few of our column definitions are identical except for their
      // properties and labels, so we lift the definition out into this
      // function for the sake of terseness
      const formatters = canBeSorted ? [
        sort.header({ getSortingColumns, sortable, strategy })
      ] : [];
      const transforms = sortable ? { transforms: [resetable] } : {};
      return {
        property,
        header: {
          label,
          ...transforms,
          // transforms: [resetable],
          formatters,
        },
      };
    }
  }

  getSortingColumns() {
    return this.state.sortingColumns || {};
  }

  render() {

    // Add unified 'name' property to each member object
    const rows = this.props.rows.map(row => ({
      ...row,
      name: `${row.first_name} ${row.last_name}`,
    }));

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
