import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as sort from 'sortabular';
import { fetchRegions } from '../regions/actions';
import { AddLink, PageLoading, SortedTable } from '../shared';
import { roles } from '../profiles';
import * as paths from '../paths';
import { showModal } from '../modals/actions';
import { fetchClub, fetchClubList } from './actions';
import ClubTable from './ClubTable';

class ViewClubs extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // Fetch the list of regions first, so that we can populate
    // the 'Region' field in the table
    this.props.fetchRegions()
    .then(this.props.fetchClubList);
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
    const { clubs, profile } = this.props;

    if (!(clubs && profile)) {
      return <PageLoading />;
    }

    const isAdmin = roles.isAdministrator(profile);

    return (
      <div>
        <h1 className="sinc-page-header d-flex justify-content-between">
          View clubs
          {' '}
          {isAdmin && <AddLink to={paths.ADD_CLUB} />}
        </h1>
        <ClubTable
          clubs={clubs}
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
