import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { PageLoading } from '../shared';
import { fetchRegionList } from '../regions';
import { fetchCourseDetail, fetchCertificateList, updateCourse } from './actions';
import CourseDetailForm from './CourseDetailForm';

const form = reduxForm({
  form: 'editCourse',
});

class EditCourse extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInstructorRemove = this.onInstructorRemove.bind(this);
    this.onInstructorSuggestionSelected = this.onInstructorSuggestionSelected.bind(this);
    this.onOrganizerRemove = this.onOrganizerRemove.bind(this);
    this.onOrganizerSuggestionSelected = this.onOrganizerSuggestionSelected.bind(this);
    this.state = {
      instructors: [],
      organizer: undefined,
    };
  }
  
  componentDidMount() {
    const courseId = this.context.router.params.id;
    this.props.fetchCourseDetail(courseId);
    this.props.fetchCertificateList();
    this.props.fetchRegionList();
    if (this.props.course) {
      const { course } = this.props;
      this.setState({
        instructors: course.instructors,
        organizer: course.organizer,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.course !== this.props.course) {
      const { course } = nextProps;
      this.setState({
        instructors: nextProps.course.instructors,
        organizer: nextProps.course.organizer,
      });
    }
  }

  onFormSubmit(formProps) {
    const { instructors, organizer } = this.state;
    const organizerId = organizer ? organizer.id : undefined;
    // Parse max participants --- if it's empty, then send null
    const maximum_participants = formProps.maximum_participants;
    const data = {
      ...formProps,
      certificate: formProps.certificate.id,
      maximum_participants: maximum_participants === '' ? null : maximum_participants,
      region: formProps.region.id,
      instructors: instructors.map(u => u.id),
      organizer: organizerId,
    };
    console.info(data);
    this.props.updateCourse(data);
  }

  // When the child form removes an instructor, remove the instructor
  // from our state
  onInstructorRemove(id) {
    this.setState({
      instructors: this.state.instructors.filter(i => i.id !== id),
    });
  }

  // When the user clicks an instructor on the child form, add it to
  // our state
  onInstructorSuggestionSelected(value, { suggestion }) {
    console.info('EditCourse.onInsSugSel');
    this.setState({
      instructors: [...this.state.instructors, suggestion],
    });
  }

  // When the user removes the organizer from the child form, remove
  // it from our state
  onOrganizerRemove() {
    this.setState({
      organizer: undefined,
    });
  }

  // When the user selects the organizer on the child form, set
  // our state accordingly
  onOrganizerSuggestionSelected(value, { suggestion }) {
    console.info('EditCourse.onOrgSugSel');
    console.info(suggestion);
    this.setState({ organizer: suggestion });
  }

  render() {
    const { handleSubmit, certificates, regions } = this.props;

    const { instructors, organizer } = this.state;

    const course = {
      ...this.props.course,
      instructors,
      organizer,
    };

    if (!(course && certificates && regions)) {
      return <PageLoading />;
    }

    return (
      <div>
        <h1 className="sinc-page-header">Edit course No. {course.id}</h1>
        <CourseDetailForm
          certificates={certificates}
          instructors={course.instructors}
          organizer={course.organizer}
          onInstructorRemove={this.onInstructorRemove}
          onInstructorSuggestionSelected={this.onInstructorSuggestionSelected}
          onOrganizerRemove={this.onOrganizerRemove}
          onOrganizerSuggestionSelected={this.onOrganizerSuggestionSelected}
          onSubmit={handleSubmit(this.onFormSubmit)}
          regions={regions}
        />
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
    initialValues: courses.course,
    regions: state.regions.regions,
  };
}

export default connect(mapStateToProps, {
  fetchCourseDetail,
  fetchCertificateList,
  fetchRegionList,
  updateCourse,
})(form(EditCourse));
