import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as sort from 'sortabular';
import { fetchClubList } from './actions';
import { fetchRegions } from '../regions/actions';
import { PageLoading, SortedTable } from '../shared';

class ViewClubs extends Component {
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
        {
          property: 'region.name',
          header: {
            label: 'Region',
            transforms: [resetable],
          },
        },
      ],
    };
  }

  componentDidMount() {
    // Fetch the list of regions first, so that we can populate
    // the 'Region' field in the table
    this.props.fetchRegions()
    .then(this.props.fetchClubList);
  }

  getSortingColumns() {
    return this.state.sortingColumns || {};
  }

  render() {
    const { clubs } = this.props;
    if (!clubs) {
      return <PageLoading />;
    }

    const { columns, sortingColumns } = this.state;
    const searchableProperties = ['name'];
    const searchingColumns = columns.filter(col => searchableProperties.includes(col.property));
    return (
      <div>
        <h1 className="sinc-page-header">View clubs</h1>
        <SortedTable
          columns={columns}
          rows={clubs}
          searchingColumns={searchingColumns}
          sortingColumns={sortingColumns}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clubs: state.clubs.clubList,
    regions: state.regions.regions,
  };
}

export default connect(mapStateToProps, {
  fetchClubList,
  fetchRegions,
})(ViewClubs);
