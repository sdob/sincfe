import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as paths from '../paths';
import { FormRow, InlineSpinner } from '../shared';
import formatDate from '../shared/utils';
import { addMember } from './actions';
import * as fields from './fields';
import ContactDetails from './ContactDetails';
import PersonalDetails from './PersonalDetails';

const form = reduxForm({
  form: 'addMember',
  validate,
});

class AddMember extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // If we've received a user object, it means that we've successfully
    // added a user; redirect to the list page.
    const { user } = nextProps.profiles;
    if (user) {
      this.context.router.push(paths.SEARCH_CURRENT_MEMBERS);
    }
  }

  handleFormSubmit(formProps) {
    const user = { ...formProps, date_of_birth: formatDate(formProps.date_of_birth) };
    console.info('should send...');
    console.info(user);
    // this.props.addMember(user);
  }

  render() {
    const { profiles, handleSubmit } = this.props;

    return (
      <div className="container">
        <h1 className="sinc-page-header">Add new member</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>

          <h2 className="sinc-section-header">Personal details</h2>
          <PersonalDetails />

          <h2 className="sinc-section-header">Contact details</h2>
          <ContactDetails />

          <h2 className="sinc-section-header">Mailing</h2>

          <div className="offset-sm-5 offset-md-3">
            <div className="checkbox">
              <label htmlFor={fields.MAILING}>
                <Field name={fields.MAILING} component="input" type="checkbox" /> Subsea Magazine
              </label>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-xs-12 sinc-form__submit-row">
              <button
                className="btn btn-primary"
                disabled={profiles.sending}
                type="submit"
              >
                {profiles.sending ? <InlineSpinner /> : 'Save' }
              </button>
            </div>
          </div>

        </form>
      </div>
    );
  }
}

/* We can't use static properties because eslint can't parse them. */
AddMember.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    profiles: state.profiles,
  };
}

function validate(values) {
  const errors = {};
  const requiredFields = [
    fields.TITLE,
    fields.FIRST_NAME,
    fields.LAST_NAME,
    fields.GENDER,
    fields.DATE_OF_BIRTH,
    fields.EMAIL,
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field may not be blank.';
    }
  });

  // Handle selects
  const requiredSelects = [fields.TITLE, fields.GENDER];
  requiredSelects.forEach((field) => {
    if (!values[field] || values[field] < 0) {
      errors[field] = 'This field may not be blank.';
    }
  });
  return errors;
}

export default connect(mapStateToProps, { addMember })(form(AddMember));
