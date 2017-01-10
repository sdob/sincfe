import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';

import { addMember } from './actions';
import * as fields from './fields';
import FormRow from './FormRow';
import PersonalDetails from './PersonalDetails';

const form = reduxForm({
  form: 'addMember',
});

class AddMember extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }


  handleFormSubmit(formProps) {
    this.props.addMember(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <h1 className="sinc-page-header">Add new member</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>

          <h2 className="sinc-section-header">Personal details</h2>
          <PersonalDetails />

          <h2 className="sinc-section-header">Contact details</h2>

          <FormRow field={fields.EMAIL} label="Email" />
          <FormRow field={fields.PHONE_HOME} label="Phone (home)" />
          <FormRow field={fields.PHONE_MOBILE} label="Phone (mobile)" />
          <FormRow field={fields.ADDRESS} component="textarea" rows="3" label="Address" />
          <FormRow field={fields.NEXT_OF_KIN_NAME} label="Next of kin" />
          <FormRow field={fields.NEXT_OF_KIN_PHONE} label="Next of kin (phone)" />

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
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </div>

        </form>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps, { addMember })(form(AddMember));
