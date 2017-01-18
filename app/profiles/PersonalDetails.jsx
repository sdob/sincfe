import React from 'react';
import { Field } from 'redux-form';
import DatePicker from '../shared/DatePicker';
import * as fields from './fields';
import * as genders from './genders';
import FormRow from '../shared/FormRow';

export default function PersonalDetails() {
  return (
    <div>
      <FormRow field={fields.FIRST_NAME} label="First name" />
      <FormRow field={fields.LAST_NAME} label="Last name" />

      <div className="form-group row">
        <label htmlFor={fields.GENDER} className="col-sm-3 col-form-label">Gender</label>
        <div className="col-sm-4">
          <Field name={fields.GENDER} component="select" className="form-control">
            <option>Select a gender</option>
            <option value={genders.MALE}>Male</option>
            <option value={genders.MALE}>Female</option>
          </Field>
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
