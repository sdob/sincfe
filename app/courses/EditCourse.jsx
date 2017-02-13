import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { PageLoading } from '../shared';
import { fetchRegionList } from '../regions';
import {
  addCourseInstruction,
  deleteCourseInstruction,
  fetchCourseDetail,
  fetchCertificateList,
  fetchCourseInstructionList,
  updateCourse,
} from './actions';
import CourseDetailForm from './CourseDetailForm';
import CourseInstructionListForm from './CourseInstructionListForm';

const form = reduxForm({
  form: 'editCourse',
});

class EditCourse extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.addInstructor = this.addInstructor.bind(this);
    this.deleteInstruction = this.deleteInstruction.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  
  componentDidMount() {
    const courseId = this.context.router.params.id;
    // Retrieve the course detail and supporting cert and region data
    this.props.fetchCourseDetail(courseId);
    this.props.fetchCertificateList();
    this.props.fetchRegionList();
    // Retrieve the instructor data
    this.props.fetchCourseInstructionList(courseId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.course !== this.props.course) {
      const { course } = nextProps;
    }
  }

  onFormSubmit(formProps) {
    const { certificate, maximum_participants, organizer } = formProps;
    const { profile } = this.props;
    // If we have an organizer object, then extract their ID; otherwise,
    // the requesting user is the organizer.
    const organizerId = organizer ? organizer.id : profile.id;
    console.info('organizer ID is ' + organizerId);
    const data = {
      ...formProps,
      // If max_participants is empty, send null; otherwise send the value
      maximum_participants: maximum_participants === '' ? null : maximum_participants,
      // If we have an organizer, then extract their ID
      organizer: organizerId,
    };
    // Send the data
    this.props.updateCourse(data);
  }

  addInstructor(instructor) {
    const { course } = this.props;
    const data = {
      course: course.id,
      user: instructor.id,
    };
    this.props.addCourseInstruction(course.id, data)
    .then(() => this.props.fetchCourseInstructionList(course.id));
  }

  deleteInstruction(instruction) {
    const { course: {id: courseId} } = this.props;
    const instructionId = instruction.id;
    this.props.deleteCourseInstruction(courseId, instructionId)
    .then(() => this.props.fetchCourseInstructionList(courseId));
  }

  render() {
    const {
      course,
      handleSubmit,
      certificates,
      courseInstructions,
      regions,
    } = this.props;

    if (!(course && certificates && regions)) {
      return <PageLoading />;
    }

    return (
      <div>
        <h1 className="sinc-page-header">Edit course No. {course.id}</h1>
        <CourseDetailForm
          certificates={certificates}
          instructors={course.instructors}
          onSubmit={handleSubmit(this.onFormSubmit)}
          regions={regions}
        />
        <h2 className="sinc-section-header">Instructors</h2>
        {typeof courseInstructions === 'undefined' ? <PageLoading /> : (
          <CourseInstructionListForm
            className="sinc-edit-course-form"
            courseInstructions={courseInstructions}
            onAdd={this.addInstructor}
            onRemove={this.deleteInstruction}
          />
        )}
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
    certificates: courses.certificates,
    course: courses.course,
    initialValues: formatCourseForInitialValues(courses.course),
    courseInstructions: courses.courseInstructions,
    profile: state.profiles.profile,
    regions: state.regions.regions,
  };

  function formatCourseForInitialValues(course) {
    // We want to pass the course and region IDs into the form so that
    // it knows which of the <option>s to select
    if (course) {
      return {
        ...course,
        certificate: course.certificate.id,
        region: course.region.id,
      };
    }
    return course;
  }
}

export default connect(mapStateToProps, {
  addCourseInstruction,
  deleteCourseInstruction,
  fetchCourseDetail,
  fetchCertificateList,
  fetchCourseInstructionList,
  fetchRegionList,
  updateCourse,
})(form(EditCourse));
