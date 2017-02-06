import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';

import * as paths from '../paths';
import { DatePicker, MemberLineItem, PageLoading, SelectRow, SubmitRow } from '../shared';
import { fetchRegionList } from '../regions';
import { addCourse, fetchCertificateList } from './actions';
import { searchForMember } from '../profiles/actions';

const form = reduxForm({
  form: 'addCourse',
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
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <h1 className="sinc-page-header">
          Add course
        </h1>
        <SelectRow
          className="form-group row"
          field="region"
          label="Region"
          options={[
            { label: 'Select region', value: '-1' },
            ...(regions.map(r => ({ label: r.name, value: r.id })))
          ]}
        />
        <SelectRow
          className="form-group row"
          field="certificate"
          label="Certificate"
          options={[
            { label: 'Select certification', value: '-1' },
            ...certificates.map(c => ({ label: c.name, value: c.id }))
          ]}
        />
        <div className="form-group row">
          <div className="col-xs-12 col-sm-6 col-md-4">
            <label htmlFor="date col-form-label">
              Date
            </label>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-8 col-lg-3">
            <Field name="date" component={DatePicker} aria-describedby="aria-date-help" />
          </div>
          <div className="col-xs-12 col-md-8 offset-md-4 col-xl-9">
            <span className="help-block" id="aria-date-help">
              Leave this empty for recurring courses.
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-12 col-sm-6 col-md-4">
            <label htmlFor="maximum_participants">
              Maximum participants
            </label>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-8 col-lg-3">
            <Field
              name="maximum_participants"
              component="input"
              className="form-control"
              aria-describedby="aria-maximum-participants-help"
            />
          </div>
          <div className="col-xs-12 col-md-8 offset-md-4 col-xl-9">
            <span className="help-block" id="aria-maximum-participants-help">
              Leave this empty for unlimited participants.
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-12 col-md-3">
            <label htmlFor="date col-form-label">
              Organizer
            </label>
          </div>
          {organizer ? (
            <MemberLineItem inline member={organizer} onClick={this.handleOrganizerClear} />
          ) : (
            <div className="col-xs-12 offset-md-1 col-md-8 col-lg-5">
              <Autosuggest
                id="js-autosuggest-organizer"
                name="organizer"
                suggestions={suggestions}
                getSuggestionValue={getSuggestionValue}
                inputProps={organizerInputProps}
                onSuggestionSelected={this.handleOrganizerSelection}
                onSuggestionsClearSelected={this.handleOrganizerClear}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                renderSuggestion={renderSuggestion}
              />
            </div>
          )}
        </div>

        <h2 className="sinc-section-header sinc-section-header--minor">
          Instructors
        </h2>
        <div>
          {instructors.map(i => (
            <div className="form-group row" key={i.id}>
              <MemberLineItem member={i} onClick={this.handleOnInstructorRemove} />
            </div>
          ))}
          <div className="form-group row">
            <div className="col-xs-12 col-md-8 offset-md-4 col-lg-5">
              <Autosuggest
                id="js-autosuggest-instructor"
                suggestions={instructorSuggestions}
                getSuggestionValue={getSuggestionValue}
                inputProps={instructorInputProps}
                onSuggestionsFetchRequested={this.onInstructorSuggestionsFetchRequested}
                onSuggestionSelected={this.handleInstructorSelection}
                renderSuggestion={renderSuggestion}
              />
            </div>
          </div>
        </div>

        <SubmitRow />
      </form>
    );

    function getSuggestionValue(member) {
      return `${member.first_name} ${member.last_name}`;
    }

    function renderSuggestion(member) {
      return (
        <div>
          {member.id} | {member.first_name} {member.last_name}
        </div>
      );
    }
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
