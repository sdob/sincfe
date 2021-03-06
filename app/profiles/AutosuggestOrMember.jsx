import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';

import { searchForMember } from '../profiles/actions';

// Limit the rate at which we hit the API for searches
const DEBOUNCE_TIME_MILLISECONDS = 250;

class AutosuggestOrMember extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    // Bind methods to this component
    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
    // Debounce the API calls
    this.onSuggestionsFetchRequested = debounce(
      this.onSuggestionsFetchRequested.bind(this),
      DEBOUNCE_TIME_MILLISECONDS,
    );
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.state = {
      suggestions: [],
      value: '',
    };
  }

  onClear() {
    // Clear the value in the wrapping Field
    this.props.input.onChange(null);
    // Remove the old suggestions from state
    this.setState({
      suggestions: [],
    });
  }

  onChange(event, { newValue }) {
    // Update the value in state (otherwise the input doesn't
    // know what to display)
    this.setState({
      value: newValue,
    });
  }

  onSuggestionsFetchRequested({ value }) {
    // Call the API, then put the returned suggestions into
    // state
    this.props.searchForMember(value)
    .then((data) => {
      this.setState({ suggestions: data });
    });
  }

  onSuggestionSelected(event, { suggestion }) {
    // Clear state
    this.setState({
      suggestions: [],
      value: ''
    });
    // Propagate the value change so that the wrapping
    // field knows about it
    this.props.input.onChange(suggestion);
  }

  render() {
    const {
      className,
      input,
      inputId,
      label,
    } = this.props;

    const {
      suggestions,
      value,
    } = this.state;

    const inputProps = {
      placeholder: 'Name or CFT number',
      id: inputId,
      onChange: this.onChange,
      value,
    };

    // If we have a value, render the member's name as a static
    // field with a 'clear' button
    if (input && input.value) {
      const { value: member } = input;
      return (
        <div className={className}>
          <label
            className="col-12 col-md-2 col-form-label"
            htmlFor="name"
          >
            {label}
          </label>
          <div className="col-1 text-right form-control-static"> {member.id} </div>
          <div className="col-8 col-sm-8 col-md-7 col-lg-4 form-control-static">
            {member.first_name} {member.last_name}
          </div>
          <div className="col-3 col-sm-3 col-md-2 text-right">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.onClear}
            >
              <i className="fa fa-fw fa-times" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={className}>
        <div className="col-12 col-md-3">
          {label}
        </div>
        <Autosuggest
          id="js-some-placeholder-id"
          getSuggestionValue={getSuggestionValue}
          inputProps={inputProps}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          renderInputComponent={renderInputComponent}
          renderSuggestion={renderSuggestion}
          suggestions={suggestions}
        />
      </div>
    );
  }
}

function getSuggestionValue(member) {
  return `${member.first_name} ${member.last_name}`;
}

function renderInputComponent(inputProps) {
  return (
    <input className="form-control" {...inputProps} />
  );
}

function renderSuggestion(member) {
  return `${member.id} | ${member.first_name} ${member.last_name}`;
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {
  searchForMember,
})(AutosuggestOrMember);
