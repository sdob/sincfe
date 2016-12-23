import React from 'react';
import { Field } from 'redux-form';

/*
 * A convenience presentational component that takes 'field', 'label'
 * and (optional) 'component' and 'rows' props and returns a div
 * wrapping a redux-form field in Bootstrap classes. It helps cut
 * down on boilerplate in other components.
 */
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
