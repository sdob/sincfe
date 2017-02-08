import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCourseDetail } from './actions';

class EditCourse extends Component {
  
  componentDidMount() {
    const courseId = this.context.router.params.id;
    this.props.fetchCourseDetail(courseId);
  }

  render() {
    return (
      <div>
        <h1 className="sinc-page-header">Edit course</h1>
        <CourseDetailForm />
      </div>
    );
  }
}

EditCourse.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { courses } = state;
  return {
    courses,
  };
}

export default connect(mapStateToProps, {
  fetchCourseDetail,
})(EditCourse);
