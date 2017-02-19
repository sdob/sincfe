import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import * as paths from '../paths';
import {
  AddLink,
  MemberTable,
  PageLoading,
  RegionFilter,
} from '../shared';
import { fetchRegions } from '../regions/actions';
import { fetchMembers, searchForMember } from './actions';

class ViewMembers extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.onRegionToggle = this.onRegionToggle.bind(this);
    this.renderRegions = this.renderRegions.bind(this);
    this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
    this.doDebouncedSearch = debounce(this.props.searchForMember, 250);

    this.state = {
      inputIsEmpty: true,
      regionVisibilities: {},
    };
  }

  componentDidMount() {
    this.props.fetchRegions();
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

  onRegionToggle(regionId, visibility) {
    const { regionVisibilities } = this.state;
    this.setState({
      regionVisibilities: {
        ...regionVisibilities,
        [regionId]: visibility,
      },
    });
  }

  onSearchFieldChange(e) {
    if (e.target.value.length) {
      this.setState({ inputIsEmpty: false });
      this.doDebouncedSearch(e.target.value);
    } else {
      this.setState({ inputIsEmpty: true });
    }
  }

  getVisibleMembers() {
    const { members } = this.props;
    const { inputIsEmpty } = this.state;
    // If the input is empty or we have no members to show, then
    // return an empty list
    if (inputIsEmpty || !members) {
      return [];
    }
    // Otherwise, filter the users by the region filter
    const { regionVisibilities } = this.state;
    return members.filter(m => regionVisibilities[m.club.region.id]);
  }

  renderRegions(regions) {
    if (!regions) {
      return <PageLoading />;
    }
    return <RegionFilter regions={regions} onChange={this.onRegionToggle} />;
  }

  render() {
    const { roles, regions } = this.props;

    const visibleMembers = this.getVisibleMembers();

    // Because this is an admin view, there are members from many
    // clubs and regions. Add these as columns in the MemberTable.
    const extraColumns = {
      'club.name': { label: 'Club', canBeSorted: true },
      'club.region.name': { label: 'Region', canBeSorted: true },
    };

    return (
      <div>
        <h1 className="sinc-page-header d-flex justify-content-between">
          View members
          <AddLink to={paths.ADD_MEMBER} />
        </h1>
        Start typing a user&rsquo;s name or CFT number to view matching results.
        <div className="form-group row">
          <div className="col-12">
            <input
              className="form-control"
              onInput={this.onSearchFieldChange}
              placeholder="Name or CFT number"
            />
          </div>
        </div>
        <h2 className="sinc-section-header sinc-section-header--minor">
          Filter by region
        </h2>
        {this.renderRegions(regions)}
        <h2 className="sinc-section-header">
          Results ({visibleMembers.length})
        </h2>
        <MemberTable
          extraColumns={extraColumns}
          roles={roles}
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
  searchForMember,
})(ViewMembers);
