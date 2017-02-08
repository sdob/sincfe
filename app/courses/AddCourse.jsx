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
    // Bind methods to the component
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInstructorAdd = this.handleInstructorAdd.bind(this);
    this.handleInstructorRemove = this.handleInstructorRemove.bind(this);
    this.handleInstructorSelection = this.handleInstructorSelection.bind(this);
    this.handleOrganizerClear = this.handleOrganizerClear.bind(this);
    this.handleOrganizerSelection = this.handleOrganizerSelection.bind(this);
    this.onInstructorChange = this.onInstructorChange.bind(this);
    this.onOrganizerChange = this.onOrganizerChange.bind(this);
    this.onInstructorSuggestionsFetchRequested = debounce(
      this.onInstructorSuggestionsFetchRequested.bind(this),
      250
    );
    this.onSuggestionsFetchRequested = debounce(this.onSuggestionsFetchRequested.bind(this), 250);
    // Initialize state
    this.state = {
      instructorValue: '',
      instructors: [],
      instructorSuggestions: [],
      suggestions: [],
      value: '',
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

  onInstructorChange(event, { newValue }) {
    this.setState({ instructorValue: newValue });
  }

  onOrganizerChange(event, { newValue }) {
    this.setState({ value: newValue });
  }

  onInstructorSuggestionsFetchRequested({ value }) {
    this.props.searchForMember(value)
    .then((data) => {
      this.setState({ instructorSuggestions: data });
    });
  }

  onSuggestionsFetchRequested({ value }) {
    // Do a search by name fragment for members and put them into
    // the state when the data return.
    this.props.searchForMember(value)
    .then((data) => {
      this.setState({ suggestions: data });
    });
  }

  handleInstructorAdd() {
    const { instructors, selectedInstructor } = this.state;
    this.setState({
      // Add the selected instructor to the list of instructors
      instructors: [...instructors, selectedInstructor],
      // Clear the input
      instructorValue: '',
      // Unset the selected instructor
      selectedInstructor: undefined,
    });
  }

  handleInstructorRemove(uid) {
    this.setState({
      instructors: this.state.instructors.filter(i => i.id !== uid),
    });
  }

  handleInstructorSelection(value, { suggestion }) {
    // Automatically add the instructor when the user selects them as
    // an option.
    const { instructors } = this.state;
    this.setState({
      instructors: [...instructors, suggestion],
      instructorValue: '',
    });
  }

  handleOrganizerClear() {
    this.setState({ organizer: undefined });
    this.setState({ value: '' });
  }

  handleOrganizerSelection(value, { suggestion }) {
    this.setState({ organizer: suggestion });
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

  render() {
    const { certificates, handleSubmit, regions } = this.props;

    // If we haven't loaded the regions and certificates, then show a spinner
    if (!(regions && certificates)) {
      return <PageLoading />;
    }

    // Extract what we need from the component's state
    const {
      instructors,
      instructorValue,
      instructorSuggestions,
      organizer,
      suggestions,
      value,
    } = this.state;

    // Set the props that we pass to the autosuggest inputs
    const organizerInputProps = {
      placeholder: 'Name or CFT number',
      id: organizerInputId,
      value,
      onChange: this.onOrganizerChange,
    };
    const instructorInputProps = {
      ...organizerInputProps,
      id: instructorInputId,
      value: instructorValue,
      onChange: this.onInstructorChange,
    };

    return (
      <div>
        <h1 className="sinc-page-header">
          Add course
        </h1>
        <CourseDetailForm
          certificates={certificates}
          onSubmit={handleSubmit(this.handleFormSubmit)}
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
