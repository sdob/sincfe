import React from 'react';
import { Field } from 'redux-form';
import { DatePicker, FormRow, SelectRow } from '../shared';
import * as fields from './fields';
import * as genders from './genders';
import * as titles from './titles';

export default function PersonalDetails() {
  const genderOptions = [
    { value: -1, label: 'Select gender' }, // value of -1 is the help text
    { value: genders.FEMALE, label: 'Female' },
    { value: genders.MALE, label: 'Male' },
  ];

  const titleOptions = [
    { value: -1, label: 'Select title' }, // value of -1 is the help text
    { value: titles.DR, label: 'Dr' },
    { value: titles.MISS, label: 'Miss' },
    { value: titles.MR, label: 'Mr' },
    { value: titles.MRS, label: 'Mrs' },
    { value: titles.MS, label: 'Ms' },
  ];
  return (
    <div>
      <SelectRow field={fields.TITLE} label="Title" options={titleOptions} required />
      <FormRow required="true" field={fields.FIRST_NAME} label="First name" />
      <FormRow required="true" field={fields.LAST_NAME} label="Last name" />
      <SelectRow field={fields.GENDER} label="Gender" options={genderOptions} required />

      <div className="form-group row">
        <label htmlFor="date_of_birth" className="col-sm-6 col-md-3 col-form-label">
          Date of birth
        </label>
        <div className="col-sm-6 col-md-9 col-lg-6">
          <Field
            name={fields.DATE_OF_BIRTH}
            component={DatePicker}
          />
        </div>
      </div>
    </div>
  );
}
