import React from 'react';
import { Field } from 'redux-form';
import DatePicker from '../shared/DatePicker';

export default function PersonalDetails() {
  return (
    <div>
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
            component={DatePicker}
          />
        </div>
      </div>
    </div>
  );
}
