import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';

import {
  DatePicker,
  DateTimePicker,
  SelectRow,
  SubmitRow,
} from '../shared';
import { searchForMember } from '../profiles/actions';
import * as fields from './fields';

const organizerInputId = 'js-autosuggest-organizer';
const instructorInputId = 'js-autosuggest-instructor';

class CourseDetailForm extends Component {
  
  constructor(props, ctx) {
    super(props, ctx);

    this.onInstructorChange = this.onInstructorChange.bind(this);
    this.onInstructorSuggestionsFetchRequested = this.onInstructorSuggestionsFetchRequested.bind(this);

    this.onOrganizerChange = this.onOrganizerChange.bind(this);
    this.onOrganizerSuggestionSelected = this.onOrganizerSuggestionSelected.bind(this);
    this.onOrganizerSuggestionsFetchRequested = debounce(
      this.onOrganizerSuggestionsFetchRequested.bind(this),
      250
    );

    this.state = {
      instructors: [],
      instructorSuggestions: [],
      instructorValue: '',
      organizerSuggestions: [],
      organizerValue: '',
    };
  }

  onInstructorChange(event, { newValue }) {
    this.setState({ instructorValue: newValue });
  }

  onInstructorSuggestionsFetchRequested({ value }) {
    this.searchThenSetState(value, 'instructorSuggestions');
  }

  onOrganizerChange(event, { newValue }) {
    this.setState({ organizerValue: newValue });
  }

  onOrganizerSuggestionsFetchRequested({ value }) {
    this.searchThenSetState(value, 'organizerSuggestions');
  }

  onOrganizerSuggestionSelected(value, { suggestion }) {
    this.setState({ organizer: suggestion });
  }

  searchThenSetState(value, stateKey) {
    this.props.searchForMember(value)
    .then((data) => {
      this.setState({ [stateKey] : data });
    });
  }

  render() {
    const {
      certificates,
      onSubmit,
      organizer,
      regions,
    } = this.props;

    const {
      instructorSuggestions,
      instructorValue,
      instructors,
      organizerSuggestions,
      organizerValue,
      organizers,
    } = this.state;

    const placeholder = 'Name or CFT Number';
    const instructorInputProps = {
      placeholder,
      id: instructorInputId,
      onChange: this.onInstructorChange,
      value: instructorValue,
    };

    const organizerInputProps = {
      placeholder,
      id: organizerInputId,
      onChange: this.onOrganizerChange,
      value: organizerValue,
    };

    return (
      <form onSubmit={onSubmit}>
        <SelectRow
          className="form-group row"
          field={fields.REGION}
          label="Region"
          options={[
            { label: 'Select region', value: '-1' },
            ...(regions.map(r => ({ label: r.name, value: r.id })))
          ]}
        />
        <SelectRow
          className="form-group row"
          field={fields.CERTIFICATE}
          label="Certificate"
          options={[
            { label: 'Select certification', value: '-1' },
            ...certificates.map(c => ({ label: c.name, value: c.id }))
          ]}
        />
        <div className="form-group row">
          <div className="col-12 col-sm-6 col-md-4">
            <label htmlFor="date col-form-label">
              Date
            </label>
          </div>
          <div className="col-12 col-sm-6 col-md-8 col-lg-3">
            <Field name={fields.DATETIME} component={DateTimePicker} aria-describedby="aria-date-help" />
          </div>
          <div className="col-12 col-md-8 offset-md-4 col-xl-9">
            <span className="help-block" id="aria-date-help">
              Leave this empty for recurring courses.
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-12 col-sm-6 col-md-4">
            <label htmlFor="maximum_participants">
              Maximum participants
            </label>
          </div>
          <div className="col-12 col-sm-6 col-md-8 col-lg-3">
            <Field
              name={fields.MAXIMUM_PARTICIPANTS}
              component="input"
              className="form-control"
              aria-describedby="aria-maximum-participants-help"
            />
          </div>
          <div className="col-12 col-md-8 offset-md-4 col-xl-9">
            <span className="help-block" id="aria-maximum-participants-help">
              Leave this empty for unlimited participants.
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-12 col-md-3">
            <label htmlFor="date col-form-label">
              Organizer
            </label>
          </div>
          {organizer ? (
            <MemberLineItem inline member={organizer} onClick={this.handleOrganizerClear} />
          ) : (
            <div className="col-12 offset-md-1 col-md-8 col-lg-5">
              <Autosuggest
                getSuggestionValue={getSuggestionValue}
                id={organizerInputId}
                inputProps={organizerInputProps}
                name={fields.ORGANIZER}
                onSuggestionsClearSelected={this.handleOrganizerClear}
                onSuggestionsFetchRequested={this.onOrganizerSuggestionsFetchRequested}
                onSuggestionSelected={this.onOrganizerSuggestionSelected}
                renderSuggestion={renderSuggestion}
                suggestions={organizerSuggestions}
              />
            </div>
          )}
          <div className="col-12 col-md-8 offset-md-4 col-xl-9">
            <span className="help-block" id="aria-maximum-participants-help">
              Leave this empty if you are organizing this course.
            </span>
          </div>
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
            <div className="col-12 col-md-8 offset-md-4 col-lg-5">
              <Autosuggest
                id="js-autosuggest-instructor"
                suggestions={instructorSuggestions}
                getSuggestionValue={getSuggestionValue}
                inputProps={instructorInputProps}
                onSuggestionsFetchRequested={this.onInstructorSuggestionsFetchRequested}
                onSuggestionSelected={this.onInstructorSuggestionSelected}
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
      return `${member.id} | ${member.first_name} ${member.last_name}`;
    }
  }
}

function mapStateToProps(state) {
  return {
    members: state.profiles.members,
  };
}

export default connect(mapStateToProps, {
  searchForMember,
})(CourseDetailForm);
