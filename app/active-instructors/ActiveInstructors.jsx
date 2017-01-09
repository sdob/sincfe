import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Table from 'reactabular-table';

import fetchActiveInstructors from './actions';
import PageLoading from '../shared/PageLoading';


class ActiveInstructors extends Component {
  componentDidMount() {
    const { profile } = this.props;
    if (profile) {
      this.props.fetchActiveInstructors(profile.club.region.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      this.props.fetchActiveInstructors(nextProps.profile.club.region.id);
    }
  }

  render() {
    const { instructors, profile } = this.props;
    if (!instructors) {
      return <PageLoading />;
    }

    // TODO: Set this to the appropriate scope (club, region, etc.)
    const scope = profile.club.region.name;

    const rows = instructors;
    const columns = [
      {
        property: 'id',
        header: {
          label: 'CFT number',
        },
      },
      {
        property: 'first_name',
        header: {
          label: 'First name',
        },
      },
      {
        property: 'last_name',
        header: {
          label: 'Last name',
        },
      },
    ];

    return (
      <div>
        <h1>Active Instructors ({scope})</h1>
        <Table.Provider
          className="table pure-table pure-table-striped"
          columns={columns}
        >
          <Table.Header />
          <Table.Body rows={rows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    instructors: state.activeInstructors.instructors,
    profile: state.profiles.profile,
  };
}

export default connect(mapStateToProps, { fetchActiveInstructors })(ActiveInstructors);
