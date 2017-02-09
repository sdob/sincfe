import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';

import {
  DatePicker,
  DateTimePicker,
  MemberLineItem,
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
    // Debounce the API call so that we don't send a request for
    // every keypress in rapid succession (leading to out-of-order
    // responses --- still a problem here, but mitigated somewhat).
    this.onInstructorSuggestionsFetchRequested = debounce(
      this.onInstructorSuggestionsFetchRequested.bind(this),
      250
    );
    this.onOrganizerChange = this.onOrganizerChange.bind(this);
    // Debounce the API call here too.
    this.onOrganizerSuggestionsFetchRequested = debounce(
      this.onOrganizerSuggestionsFetchRequested.bind(this),
      250
    );

    // Run the parent element's method, then clear our input
    this.onInstructorSuggestionSelected = (...args) => {
      this.props.onInstructorSuggestionSelected(...args);
      this.setState({ instructorValue: '' });
    }

    // Run the parent element's method, then clear our input
    this.onOrganizerSuggestionSelected = (...args) => {
      this.props.onOrganizerSuggestionSelected(...args);
      this.setState({ organizerValue: '' });
    }

    // We're only maintaining the inputs' state in this component;
    // our parent will maintain the form values in their state
    this.state = {
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

  searchThenSetState(value, stateKey) {
    this.props.searchForMember(value)
    .then((data) => {
      this.setState({ [stateKey] : data });
    });
  }

  render() {
    const {
      certificates,
      instructors,
      onInstructorRemove,
      onOrganizerRemove,
      onSubmit,
      organizer,
      regions,
    } = this.props;

    const {
      instructorSuggestions,
      instructorValue,
      organizerSuggestions,
      organizerValue,
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
          <div className="col-12 col-sm-6 col-md-3">
            <label htmlFor="date col-form-label">
              Date
            </label>
          </div>
          <div className="col-12 col-sm-6 col-md-9 col-lg-5">
            <Field name={fields.DATETIME} component={DateTimePicker} aria-describedby="aria-date-help" />
          </div>
          <div className="col-12 col-md-9 offset-md-3">
            <span className="help-block" id="aria-date-help">
              Leave this empty for recurring courses.
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-12 col-sm-6 col-md-3">
            <label htmlFor="maximum_participants">
              Maximum participants
            </label>
          </div>
          <div className="col-12 col-sm-6 col-md-9 col-lg-5">
            <Field
              name={fields.MAXIMUM_PARTICIPANTS}
              component="input"
              className="form-control"
              aria-describedby="aria-maximum-participants-help"
            />
          </div>
          <div className="col-12 col-md-9 offset-md-3">
            <span className="help-block" id="aria-maximum-participants-help">
              Leave this empty for unlimited participants.
            </span>
          </div>
        </div>
        {organizer ? (
          <MemberLineItem inline label="Organizer" member={organizer} onClick={onOrganizerRemove} />
        ) : (
          <div className="row">
            <div className="col-12 col-md-3">
              <label htmlFor="date col-form-label">
                Organizer
              </label>
            </div>
            <div className="col-12 col-md-9 col-lg-5">
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
          </div>
        )}
        <div className="form-group row">
          <div className="col-12 col-md-9 offset-md-3">
            <span className="help-block" id="aria-maximum-participants-help">
              Leave this empty if you are organizing this course.
            </span>
          </div>
        </div>

        <h2 className="sinc-section-header sinc-section-header--minor">
          Instructors
        </h2>
        {instructors.map(i => (
          <MemberLineItem label="" member={i} onClick={() => onInstructorRemove(i.id)} />
        ))}
        <div>
          <div className="form-group row">
            <div className="col-12 col-md-9 offset-md-3 col-lg-5">
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
