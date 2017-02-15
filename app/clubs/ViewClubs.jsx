import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as sort from 'sortabular';
import { fetchRegions } from '../regions/actions';
import { AddLink, PageLoading, RegionFilter, SortedTable } from '../shared';
import * as paths from '../paths';
import { showModal } from '../modals/actions';
import { fetchClub, fetchClubList } from './actions';
import ClubTable from './ClubTable';

class ViewClubs extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.getVisibleClubs = this.getVisibleClubs.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onRegionToggle = this.onRegionToggle.bind(this);
    this.state = {
      regionVisibilities: {},
    };
  }

  componentDidMount() {
    // Fetch the list of regions first, so that we can populate
    // the 'Region' field in the table
    this.props.fetchRegions()
    .then(this.props.fetchClubList);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.regions !== this.props.regions) {
      const visibilities = {};
      nextProps.regions.forEach((region) => {
        visibilities[region.id] = true;
      });
      this.setState({ regionVisibilities: visibilities });
    }
  }

  getVisibleClubs() {
    const { clubs } = this.props;
    const { regionVisibilities } = this.state;
    return clubs.filter(club => regionVisibilities[club.region.id]);
  }

  onRegionToggle(rid, value) {
    this.setState({
      regionVisibilities: {
        ...this.state.regionVisibilities,
        [rid]: value,
      },
    });
  }

  handleDelete(cid) {
    console.info('handling delete');
    this.props.fetchClub(cid)
    .then((club) => {
      console.info(club);
      this.props.showModal({
        modalType: 'DELETE_CLUB',
        modalProps: { club },
      });
    });
  }

  render() {
    const { clubs, isAdmin, profile, regions } = this.props;

    if (!(clubs && profile)) {
      return <PageLoading />;
    }

    return (
      <div>
        <h1 className="sinc-page-header d-flex justify-content-between">
          View clubs
          {' '}
          {isAdmin && <AddLink to={paths.ADD_CLUB} />}
        </h1>
        <h2 className="sinc-section-header sinc-section-header--minor">
          Filter by region
        </h2>
        <RegionFilter regions={regions} onChange={this.onRegionToggle} />
        <h2 className="sinc-section-header">
          Results
        </h2>
        <ClubTable
          clubs={this.getVisibleClubs()}
          editable={true}
          handleDelete={this.handleDelete}
          isAdmin={isAdmin}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { profile } = state.profiles;
  return {
    clubs: state.clubs.clubList,
    profile,
    regions: state.regions.regions,
  };
}

export default connect(mapStateToProps, {
  fetchClub,
  fetchClubList,
  fetchRegions,
  showModal,
})(ViewClubs);
