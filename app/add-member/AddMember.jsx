import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'style!css!react-datepicker/dist/react-datepicker.css';

const form = reduxForm({
  form: 'addMember',
});

function AddMember() {
  return (
    <div className="container">
      <h1 className="sinc-page-header">Add new member</h1>
      <form>
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
          <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
          <div className="col-sm-9">
            <Field name="email" className="form-control" component="input" type="email" />
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
            <Field name="date_of_birth" className="form-control" component={renderDatePicker} />
          </div>
        </div>

      </form>
    </div>
  );
}

function renderDatePicker({ input, placeholder, defaultValue, meta: { touched, error } }) {
  return (
      <DatePicker
        {...input}
        className="form-control"
        dateFormat="DD MMMM YYYY"
        showMonthDropdown={true}
        showYearDropdown={true}
        selected={input.value ? moment(input.value) : null}
      />
  );
}

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(form(AddMember));
