import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';

import { searchForMember } from '../profiles/actions';

class InstructorInput extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    // Bind methods
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = debounce(
      this.onSuggestionsFetchRequested.bind(this),
      250
    );
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.resetInputState = this.resetInputState;
    this.state = {
      suggestions: [],
      value: '',
    };
  }

  onChange(event, { newValue }) {
    this.setState({ value: newValue });
  }

  onSuggestionsFetchRequested({ value }) {
    this.props.searchForMember(value)
    .then((data) => {
      // Exclude members who are already instructing on this course
      const { courseInstructions } = this.props;
      const instructorIds = courseInstructions.map(i => i.user.id);
      this.setState({
        suggestions: data.filter(user => !instructorIds.includes(user.id)),
      });
    });
  }

  onSuggestionSelected(event, { suggestion }) {
    this.setState({
      selectedInstructor: suggestion,
    });
  }

  resetInputState() {
    this.setState({
      selectedInstructor: null,
      suggestions: [],
      value: '',
    });
  }

  render() {
    const {
      onAdd,
    } = this.props;

    const {
      selectedInstructor,
      suggestions,
      value,
    } = this.state;

    const inputProps = {
      onChange: this.onChange,
      value,
    };

    return (
      <div className="form-group row">
        <div className="col-9 offset-md-3 col-md-7 col-lg-4">
          <Autosuggest
            inputProps={inputProps}
            getSuggestionValue={getSuggestionValue}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            renderSuggestion={renderSuggestion}
            suggestions={suggestions}
          />
        </div>
        {selectedInstructor && (
          <div className="col-3 col-sm-3 col-md-2 text-right">
            <button
              className="btn btn-primary"
              onClick={() => {
                onAdd(selectedInstructor);
                this.resetInputState();
              }}
              type="button"
            >
              <i className="fa fa-fw fa-plus" />
            </button>
          </div>
        )}
      </div>
    );
  }
}

function getSuggestionValue(member) {
  return `${member.first_name} ${member.last_name}`;
}

function renderSuggestion(member) {
  return `${member.id} | ${member.first_name} ${member.last_name}`;
}

export default connect(null, {
  searchForMember,
})(InstructorInput);
