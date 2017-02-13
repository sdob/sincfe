import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';

import * as paths from '../paths';
import { DateTimePicker, MemberLineItem, PageLoading, SelectRow, SubmitRow } from '../shared';
import { fetchRegionList } from '../regions';
import { addCourse, fetchCertificateList } from './actions';
import { searchForMember } from '../profiles/actions';
import * as fields from './fields';
import validate from './validate';
import CourseDetailForm from './CourseDetailForm';

const form = reduxForm({
  form: 'addCourse',
  // validate,
});

const instructorInputId = 'js-autosuggest-instructor';
const organizerInputId = 'js-autosuggest-organizer';

class AddCourse extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
    // Fetch the list of regions and certificates from the API
    this.props.fetchRegionList();
    this.props.fetchCertificateList();
  }

  componentWillReceiveProps(nextProps) {
    // If we've received a 'course' object, it means that we've successfully added
    // a course.
    const { added } = nextProps;
    if (added) {
      this.context.router.push(paths.VIEW_COURSES);
    }
  }

  handleFormSubmit(formProps) {
    const { instructors, organizer } = this.state;
    const organizerId = organizer ? organizer.id : undefined;
    // Add the instructors to the form data
    const data = {
      ...formProps,
      instructors: instructors.map(u => u.id),
      organizer: organizerId,
    };
    console.info('data');
    console.info(data);
    this.props.addCourse(data);
  }

  // When the child form removes an instructor, remove the instructor
  // from our state
  onInstructorRemove(id) {
    this.setState({ instructors: this.state.instructors.filter(i => i.id !== id) });
  }

  // When the user clicks an instructor on the child form, add it to
  // our state
  onInstructorSuggestionSelected(value, { suggestion }) {
    this.setState({
      instructors: [...this.state.instructors, suggestion],
    });
  }

  // When the user removes the organizer from the child form, remove
  // it from our state
  onOrganizerRemove() {
    this.setState({ organizer: undefined, organizerValue: '' });
  }

  // When the user selects the organizer on the child form, set
  // our state accordingly
  onOrganizerSuggestionSelected(value, { suggestion }) {
    this.setState({ organizer: suggestion });
  }

  render() {
    const { certificates, handleSubmit, regions } = this.props;

    // If we haven't loaded the regions and certificates, then show a spinner
    if (!(regions && certificates)) {
      return <PageLoading />;
    }

    // Extract what we need from state
    const {
      instructors,
      organizer,
    } = this.state;

    return (
      <div>
        <h1 className="sinc-page-header">
          Add course
        </h1>
        <CourseDetailForm
          certificates={certificates}
          instructors={instructors}
          onInstructorRemove={this.onInstructorRemove}
          onInstructorSuggestionSelected={this.onInstructorSuggestionSelected}
          onOrganizerRemove={this.onOrganizerRemove}
          onOrganizerSuggestionSelected={this.onOrganizerSuggestionSelected}
          onSubmit={handleSubmit(this.handleFormSubmit)}
          organizer={organizer}
          regions={regions}
        />
      </div>
    );
  }
}

AddCourse.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    added: state.courses.added,
    certificates: state.courses.certificates,
    members: state.profiles.members,
    regions: state.regions.regions,
  };
}

export default connect(mapStateToProps, {
  addCourse,
  fetchCertificateList,
  fetchRegionList,
  searchForMember,
})(form(AddCourse));
