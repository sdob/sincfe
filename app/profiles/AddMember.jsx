import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import { DateTimePicker } from 'react-widgets';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

import { addMember } from './actions';
import * as fields from './fields';
import FormRow from './FormRow';

import 'style!css!react-datepicker/dist/react-datepicker.css';

const form = reduxForm({
  form: 'addMember',
});

class AddMember extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  DatePicker({ input, meta, value, ...rest }) {
    return (
      <DateTimePicker
        {...input}
        format="DD/MM/YYYY"
        value={value}
        time={false}
        onBlur={() => input.onBlur(value)}
        {...rest}
      />
   );
  }

  handleFormSubmit(formProps) {
    this.props.addMember(formProps);
  }

  render() {
    momentLocalizer(moment);

    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <h1 className="sinc-page-header">Add new member</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <h2 className="sinc-section-header">Personal details</h2>
          <div className="form-group row">
            <label htmlFor="first_name" className="col-sm-3 col-form-label">First name</label>
            <div className="col-sm-9">
              <Field name="first_name" className="form-control" component="input" type="text" />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="last_name" className="col-sm-3 col-form-label">Last name</label>
            <div className="col-sm-9">
              <Field name="last_name" className="form-control" component="input" type="text" />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="gender" className="col-sm-3 col-form-label">Gender</label>
            <div className="col-sm-4">
              <select className="form-control">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>


          <div className="form-group row">
            <label htmlFor="date_of_birth" className="col-sm-3 col-form-label">Date of birth</label>
            <div className="col-sm-4">
              <Field
                name="date_of_birth"
                component={this.DatePicker}
              />
            </div>
          </div>

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
