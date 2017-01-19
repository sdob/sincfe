import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Table from 'reactabular-table';
import * as resolve from 'table-resolver';

import fetchActiveInstructors from './actions';
import { fetchRegionDetail } from '../regions/actions';
import PageLoading from '../shared/PageLoading';
import MemberTable from '../shared/MemberTable';

class ActiveInstructors extends Component {
  componentDidMount() {
    const { profile } = this.props;
    if (profile) {
      this.retrieveData(profile);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      this.retrieveData(nextProps.profile);
    }
  }

  retrieveData(profile) {
    const { region } = profile.club;
    this.props.fetchActiveInstructors(region);
    this.props.fetchRegionDetail(region);
  }

  render() {
    const { instructors, region } = this.props;
    if (!(instructors && region)) {
      return <PageLoading />;
    }

    return (
      <div>
        <h1>Active Instructors ({region.name} region)</h1>
        <MemberTable rows={instructors} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    instructors: state.activeInstructors.instructors,
    profile: state.profiles.profile,
    region: state.regions.regionDetail,
  };
}

export default connect(mapStateToProps, {
  fetchActiveInstructors,
  fetchRegionDetail
})(ActiveInstructors);
