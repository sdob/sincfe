import React, { Component } from 'react';
import { connect } from 'react-redux';
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

    return (
      <div>
        <h1>Active Instructors ({scope})</h1>
        <table className="table">
          <thead>
            <tr>
              <th>CFT #</th>
              <th>First name</th>
              <th>Last name</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor, i) => (
              <tr key={i}>
                <td>{instructor.id}</td>
                <td>{instructor.first_name}</td>
                <td>{instructor.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
