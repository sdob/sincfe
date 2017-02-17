import React, { Component } from 'react';
import { store } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, initialize, reset } from 'redux-form';
import { DeleteButton, PageLoading } from '../shared';
import { fetchRegionList } from '../regions';
import { showModal } from '../modals';
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

const FORM_NAME = 'EditCourse';

const form = reduxForm({
  form: FORM_NAME,
  // This allows us to replace state.course when switching from one
  // course view to another (by default, redux-form allows us one
  // and only one initialization pass. We reinitialize
  enableReinitialize: true,
});

class EditCourse extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    // Bind methods
    this.addInstructor = this.addInstructor.bind(this);
    this.deleteInstruction = this.deleteInstruction.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleDelete() {
    const { course, showModal } = this.props;
    console.info('deleting course');
    showModal({
      modalType: 'DELETE_COURSE',
      modalProps: {
        courseId: course.id,
        goBack: true,
      },
    });
  }

  onFormSubmit(formProps) {
    // Send the data
    return this.props.updateCourse(formProps)
    .then(course => {
      const values = formatCourseForInitialValues(course);
      this.props.reset(FORM_NAME);
    });
  }

  addInstructor(instructor) {
    const { course } = this.props;
    const data = {
      course: course.id,
      user: instructor.id,
    };
    // Add the instructor immediately
    // TODO: we should hold this in state until the user clicks 'Save';
    // it's not intuitive that this is updated immediately while the
    // other data aren't sent until the user dictates.
    this.props.addCourseInstruction(course.id, data)
    .then(() => this.props.fetchCourseInstructionList(course.id));
  }

  deleteInstruction(instruction) {
    const { course: {id: courseId} } = this.props;
    const instructionId = instruction.id;
    // Remove the instructor immediately
    // TODO: we should hold this in state until the user clicks 'Save';
    // it's not intuitive that this is updated immediately while the
    // other data aren't sent until the user dictates.
    this.props.deleteCourseInstruction(courseId, instructionId)
    .then(() => this.props.fetchCourseInstructionList(courseId));
  }

  render() {
    const {
      course,
      handleSubmit,
      courseInstructions,
      roles: { isAdmin },
    } = this.props;

    // Don't display the form until we've received the course data
    if (!course) {
      return <PageLoading />;
    }

    return (
      <div>
        <h1 className="sinc-page-header d-flex justify-content-between">
          Edit course No. {course.id}
          {isAdmin && <DeleteButton compact={false} onClick={this.handleDelete} />}
        </h1>
        <CourseDetailForm onSubmit={handleSubmit(this.onFormSubmit)} {...this.props} />

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
}

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

export default connect(mapStateToProps, {
  addCourseInstruction,
  deleteCourseInstruction,
  fetchCourseDetail,
  fetchCertificateList,
  fetchCourseInstructionList,
  fetchRegionList,
  reset,
  showModal,
  updateCourse,
})(form(EditCourse));
