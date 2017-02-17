import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NotImplementedYet, PageLoading } from '../shared';
import { fetchCoursesOrganized } from './actions';
import CourseTable from './CourseTable';

class OrganizeCourses extends Component {
  componentDidMount() {
    const { profile } = this.props;
    if (profile) {
      this.props.fetchCoursesOrganized(profile.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      this.props.fetchCoursesOrganized(nextProps.profile.id);
    }
  }

  render() {
    const { courses } = this.props;
    if (!courses) {
      return <PageLoading />;
    }
    return (
      <div>
        <h1 className="sinc-page-header">Organize courses</h1>
        {courses.length ? <CourseTable rows={courses} /> : renderNoCourses()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    courses: state.courses.courses,
    profile: state.profiles.profile,
  };
}

function renderNoCourses() {
  return (
    <p>You aren't listed as an organizer on any courses.</p>
  );
}

export default connect(mapStateToProps, {
  fetchCoursesOrganized,
})(OrganizeCourses);
