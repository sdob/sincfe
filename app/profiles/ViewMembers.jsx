import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  MemberTable,
  PageLoading,
  RegionFilter,
} from '../shared';
import { fetchRegions } from '../regions/actions';
import { fetchMembers } from './actions';

class ViewMembers extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.onRegionToggle = this.onRegionToggle.bind(this);

    this.state = {
      regionVisibilities: {},
    };
  }

  getVisibleMembers() {
    const { members } = this.props;
    const { regionVisibilities } = this.state;
    return members.filter(m => regionVisibilities[m.club.region.id]);
  }

  componentDidMount() {
    this.props.fetchMembers();
    this.props.fetchRegions();
  }

  componentWillReceiveProps(nextProps) {
    const { regionVisibilities } = this.state;
    if (nextProps.regions !== this.props.regions) {
      const visibilities = {};
      nextProps.regions.forEach((region) => {
        visibilities[region.id] = true;
      });
      this.setState({ regionVisibilities: visibilities });
    }
  }

  onRegionToggle(regionId, visibility) {
    const { regionVisibilities } = this.state;
    this.setState({
      regionVisibilities: {
        ...regionVisibilities,
        [regionId]: visibility,
      },
    });
  }

  render() {
    const { members,regions } = this.props;
    if (!members) {
      return (
        <div>
          <h1 className="sinc-page-header">View members</h1>
          <PageLoading />
        </div>
      );
    }

    const visibleMembers = this.getVisibleMembers();
    // Because this is an admin view, there are members from many
    // clubs and regions. Add these as columns in the MemberTable.
    const extraColumns = {
      'club.name': { label: 'Club', canBeSorted: true },
      'club.region.name': { label: 'Region', canBeSorted: true },
    };
    return (
      <div>
        <h1 className="sinc-page-header">View members ({visibleMembers.length} / {members.length})</h1>
        <RegionFilter regions={regions} onChange={this.onRegionToggle} />
        <MemberTable
          extraColumns={extraColumns}
          rows={visibleMembers}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { members } = state.profiles;
  const { regions } = state.regions;
  return {
    members,
    regions,
  };
}

export default connect(mapStateToProps, {
  fetchMembers,
  fetchRegions,
})(ViewMembers);
