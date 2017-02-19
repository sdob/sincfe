import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { SubmissionError, reduxForm } from 'redux-form';
import { fetchRegionList } from '../regions';
import { addClub } from './actions';

import ClubDetailForm from './ClubDetailForm';
import validate from './validate';

const form = reduxForm({
  form: 'addClub',
  validate,
});

class AddClub extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchRegionList();
  }

  handleFormSubmit(formProps) {
    const data = {
      ...formProps,
      region: formProps.region < 0 ? null : formProps.region,
    };
    // Make the POST request and go back to the previous view if
    // successful; if there are errors, display them on the form.
    return this.props.addClub(data)
    .then(() => browserHistory.goBack())
    .catch((error) => {
      if (error.response) {
        throw new SubmissionError(error.response.data);
      }
    });
  }

  render() {
    const { handleSubmit, roles: { isAdmin }, submitting } = this.props;
    return (
      <div>
        <h1 className="sinc-page-header">Add club</h1>
        <ClubDetailForm
          addNew
          isAdmin={isAdmin}
          onSubmit={handleSubmit(this.handleFormSubmit)}
          submitting={submitting}
        />
      </div>
    );
  }
}

export default connect(null, {
  addClub,
  fetchRegionList,
})(form(AddClub));
