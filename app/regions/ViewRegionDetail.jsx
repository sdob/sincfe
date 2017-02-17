import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  MemberTable,
  PageLoading,
} from '../shared';
import { ClubTable } from '../clubs'
import { fetchRegionClubList, fetchRegionDetail, fetchRegionMemberList } from './actions';

class ViewRegionDetail extends Component {
  componentDidMount() {
    console.info('component mounted');
    const regionId = this.context.router.params.id;
    this.props.fetchRegionClubList(regionId);
    this.props.fetchRegionDetail(regionId);
    this.props.fetchRegionMemberList(regionId);
  }

  render() {
    const { roles, clubs, members, region } = this.props;
    return (
      <div>
        <h1 className="sinc-page-header">
          View region
          {region === undefined ? '' : `: ${region.name}`}
        </h1>
        <h2 className="sinc-section-header">
          Clubs
          {clubs === undefined ? '' : ` (${clubs.length})`}
        </h2>
        {renderClubList(clubs)}
        <h2 className="sinc-section-header">
          Members
          {members === undefined ? '' : ` (${members.length})`}
        </h2>
        {renderMemberList(members, roles)}
      </div>
    );

    function renderClubList(clubs) {
      if (!clubs) {
        return <PageLoading />;
      }
      return (
        <ClubTable
          clubs={clubs}
          editable={true}
          showRegions={false}
        />
      );
    }

    function renderMemberList(members, roles) {
      if (!members) {
        return <PageLoading />;
      }
      return (
        <MemberTable
          roles={roles}
          rows={members}
        />
      );
    }
  }

}

ViewRegionDetail.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const clubs = state.regions.regionClubList;
  const members = state.regions.regionMemberList;
  const region = state.regions.regionDetail;
  return {
    clubs,
    members,
    region,
  };
}

export default connect(mapStateToProps, {
  fetchRegionClubList,
  fetchRegionDetail,
  fetchRegionMemberList,
})(ViewRegionDetail);
