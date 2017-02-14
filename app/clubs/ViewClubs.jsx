import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as sort from 'sortabular';
import { fetchClubList } from './actions';
import { fetchRegions } from '../regions/actions';
import { PageLoading, SortedTable } from '../shared';
import ClubTable from './ClubTable';

class ViewClubs extends Component {

  componentDidMount() {
    // Fetch the list of regions first, so that we can populate
    // the 'Region' field in the table
    this.props.fetchRegions()
    .then(this.props.fetchClubList);
  }

  render() {
    const { clubs } = this.props;

    if (!clubs) {
      return <PageLoading />;
    }

    return (
      <div>
        <h1 className="sinc-page-header">View clubs</h1>
        <ClubTable clubs={clubs} />
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
