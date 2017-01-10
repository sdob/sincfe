import React from 'react';
import { Field } from 'redux-form';
import DatePicker from '../shared/DatePicker';
import * as fields from './fields';
import FormRow from './FormRow';

export default function PersonalDetails() {
  return (
    <div>
      <FormRow field={fields.FIRST_NAME} label="First name" />
      <FormRow field={fields.LAST_NAME} label="Last name" />

      <div className="form-group row">
        <label htmlFor="gender" className="col-sm-3 col-form-label">Gender</label>
        <div className="col-sm-4">
          <select className="form-control">
            <option>Select a gender</option>
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
            component={DatePicker}
          />
        </div>
      </div>
    </div>
  );
}
