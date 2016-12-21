import React from 'react';
import { Field } from 'redux-form';

export default function FormRow(props) {
  return (
    <div className="form-group row">
      <label htmlFor={props.field} className="col-md-3 col-form-label">
        {props.label}
      </label>
      <div className="col-md-9">
        <Field name={props.field} className="form-control" component={props.component || 'input'} rows={props.rows} type="text" />
      </div>
    </div>
  );
}
