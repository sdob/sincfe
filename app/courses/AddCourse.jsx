import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Autosuggest from 'react-autosuggest';
import DebounceInput from 'react-debounce-input';
import debounce from 'lodash/debounce';

import { DatePicker, PageLoading, SubmitRow } from '../shared';
import { fetchRegionList } from '../regions';
import { fetchCertificateList } from './actions';
import { searchForMember } from '../profiles/actions';

const form = reduxForm({
  form: 'AddCourse',
});

class AddCourse extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.onOrganizerChange = this.onOrganizerChange.bind(this);
    this.onSuggestionsFetchRequested = debounce(this.onSuggestionsFetchRequested.bind(this), 250);
    this.state = {
      value: '',
      suggestions: [],
    };
  }

  componentDidMount() {
    // Fetch the list of regions and certificates from the API
    this.props.fetchRegionList();
    this.props.fetchCertificateList();
  }

  onOrganizerChange(event, { newValue }) {
    this.setState({ value: newValue });
  }

  onSuggestionsFetchRequested({ value }) {
    // Do a search by name fragment for members and put them into
    // the state when the data return.
    this.props.searchForMember(value)
    .then((data) => {
      this.setState({ suggestions: data });
    });
  }

  render() {
    const {certificates, regions, submitting } = this.props;
    if (!(regions && certificates)) {
      return <PageLoading />;
    }

    // Set the props that we pass to the autosuggest input
    const { value, suggestions } = this.state;
    const organizerInputProps = {
      placeholder: 'Name or CFT number',
      value,
      onChange: this.onOrganizerChange,
    };

    return (
      <form>
        <h1 className="sinc-page-header">
          Add course
        </h1>
        <div className="form-group row">
          <div className="col-xs-6 col-md-4 col-xl-3">
            <label htmlFor="region">
              Region
            </label>
          </div>
          <div className="col-xs-6 col-md-8 col-lg-3">
            <select className="form-control" name="region">
              <option value="NaN">Select region</option>
              {regions.map(r => (
                <option value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-6 col-md-4 col-xl-3">
            <label htmlFor="certificate">
              Certification
            </label>
          </div>
          <div className="col-xs-6 col-md-8 col-lg-3">
            <select className="form-control" name="certificate">
              <option value="NaN">Select certification</option>
              {certificates.map(c => (
                <option value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-6 col-md-4 col-xl-3">
            <label htmlFor="date col-form-label">
              Date
            </label>
          </div>
          <div className="col-xs-6 col-md-8 col-lg-3">
            <Field name="date" component={DatePicker} aria-describedby="aria-date-help" />
          </div>
          <div className="col-xs-6 offset-xs-6 col-md-8 offset-md-4 col-xl-9 offset-xl-3">
            <p className="help-block" id="aria-date-help">
              Leave this empty for recurring courses.
            </p>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-12 col-md-4 col-xl-3">
            <label htmlFor="date col-form-label">
              Organizer
            </label>
          </div>
          <div className="col-xs-12 col-md-8 col-lg-5 col-xl-6">
            <Autosuggest
              suggestions={suggestions}
              getSuggestionValue={getSuggestionValue}
              inputProps={organizerInputProps}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              renderSuggestion={renderSuggestion}
            />
            {/* renderInputComponent={renderInputComponent} */}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-6 col-md-4 col-xl-3">
            <label htmlFor="maximum_participants">
              Max. participants
            </label>
          </div>
          <div className="col-xs-6 col-md-8 col-lg-3">
            <Field
              name="maximum_participants"
              component="input"
              className="form-control"
              aria-describedby="aria-maximum-participants-help"
            />
          </div>
          <div className="col-xs-6 offset-xs-6 col-md-8 offset-md-4 col-xl-9 offset-xl-3">
            <p className="help-block" id="aria-maximum-participants-help">
              Leave this empty for unlimited participants.
            </p>
          </div>
        </div>
        <SubmitRow />
      </form>
    );

    function getSuggestionValue(member) {
      return `${member.first_name} ${member.last_name}`;
    }

    function renderInputComponent(inputProps) {
      console.info(inputProps);
      return (
        <DebounceInput
          debounceTimeout={300}
          {...inputProps}
        />
      );
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

function mapStateToProps(state) {
  return {
    certificates: state.courses.certificates,
    members: state.profiles.members,
    regions: state.regions.regions,
  };
}

export default connect(mapStateToProps, {
  fetchCertificateList,
  fetchRegionList,
  searchForMember,
})(form(AddCourse));
