import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as sort from 'sortabular';
import PageLoading from '../shared/PageLoading';
import SortedTable from '../shared/SortedTable';
import { fetchClubList } from './actions';
import { fetchRegions } from '../regions/actions';

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
    return (
      <div>
        <h1 className="sinc-page-header">View clubs</h1>
        <SortedTable
          columns={columns}
          rows={clubs}
          sortingColumns={sortingColumns}
        />
      </div>
    );
  }
}

function findRegionName(rid, regions, defaultName='National') {
  // If regions is undefined, then either we are waiting for the API
  // to respond, or something else has gone wrong. Either way, provide
  // something sane.
  if (typeof regions === 'undefined') {
    return 'Unknown';
  }
  // Otherwise, look for a region with a matching ID and return its
  // name.
  const filteredRegions = regions.filter(region => region.id == rid);
  if (filteredRegions.length) {
    return filteredRegions[0].name;
  }
  // If no region is found, return our default
  return defaultName;
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
