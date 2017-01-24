import React from 'react';
import { Field } from 'redux-form';
import { DatePicker, FormRow } from '../shared';
import * as fields from './fields';
import * as genders from './genders';
import * as titles from './titles';

export default function PersonalDetails() {
  return (
    <div>

      <div className="form-group row">
        <label
          htmlFor="editProfileTitle"
          className="col-sm-6 col-md-3 col-form-label"
        >
          Title
        </label>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <Field name={fields.TITLE} component="select" className="form-control">
            <option value="-1">Select title</option>
            <option value={titles.DR}>Dr</option>
            <option value={titles.MISS}>Miss</option>
            <option value={titles.MR}>Mr</option>
            <option value={titles.MRS}>Mrs</option>
            <option value={titles.MS}>Ms</option>
          </Field>
        </div>
      </div>

      <FormRow field={fields.FIRST_NAME} label="First name" />
      <FormRow field={fields.LAST_NAME} label="Last name" />

      <div className="form-group row">
        <label htmlFor={fields.GENDER} className="col-sm-3 col-form-label">Gender</label>
        <div className="col-sm-4">
          <Field name={fields.GENDER} component="select" className="form-control">
            <option>Select a gender</option>
            <option value={genders.MALE}>Male</option>
            <option value={genders.FEMALE}>Female</option>
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
