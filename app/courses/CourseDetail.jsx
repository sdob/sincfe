import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCourseDetail } from './actions';
import CourseDetailRow from './CourseDetailRow';
import { PageLoading, NotImplementedYet } from '../shared';

class CourseDetail extends Component {
  componentWillMount() {
    const { id } = this.props.routeParams;
    this.props.fetchCourseDetail(id);
  }

  componentWillReceiveProps(nextProps) {
    console.info('CourseDetail will receive props');
    console.log(nextProps);
  }

  render() {
    const { course } = this.props;
    if (!course) {
      return <PageLoading />;
    }
    return (
      <div>
        <h2 className="sinc-section-header">General course details</h2>
        <CourseDetailRow label="Course no" value={course.id} />
        <CourseDetailRow label="Created by" value={`${course.creator.first_name} ${course.creator.last_name}`} />
        <CourseDetailRow label="Course name" value={course.certificate.name} />
        <CourseDetailRow label="Materials sent?" value={course.materials_sent ? 'Yes' : 'No'} />
        <CourseDetailRow label="Organizer">
          <span>{course.organizer.first_name} {course.organizer.last_name} </span>
          <span><a href={`mailto:${course.organizer.email}`}>{course.organizer.email}</a></span>
        </CourseDetailRow>
        <CourseDetailRow label="Region" value={course.region.name} />

        <h2 className="sinc-section-header">Organizational details</h2>
        {course.location && <CourseDetailRow label="Location" value={course.location} />}
        <CourseDetailRow label="Date" value={course.date || 'Ongoing'} />
        {course.time && <CourseDetailRow label="Time" value={course.time} />}
        <CourseDetailRow label="Maximum participants" value={course.maximum_participants || 'Unlimited'} />
        {course.comments && (
          <CourseDetailRow label="Comments">
            {course.comments}
          </CourseDetailRow>
        )}

        <h2 className="sinc-section-header">Book a place</h2>
        <NotImplementedYet />

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    course: state.courses.course,
  };
}

export default connect(mapStateToProps, { fetchCourseDetail })(CourseDetail);
