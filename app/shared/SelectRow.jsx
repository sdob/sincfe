import React from 'react';
import { Field } from 'redux-form';

export default function SelectRow(props) {
  const { field } = props;
  return (
    <Field name={field} {...props} component={renderSelect} />
  );
}

function renderSelect({ field, input, label, options, meta: { touched, error } }) {
  const className = `form-group row${(touched && error) ? ' has-danger' : ''}`;
  return (
    <div className={className}>
      <div className="col-xs-12 col-sm-6 col-md-4 col-form-label">
        <label htmlFor={field} className="form-control-label">
          {label}
        </label>
      </div>
      <div className="col-xs-12 col-sm-6 col-md-8 col-lg-3">
        <select {...input} className="form-control">
          {options.map(renderOption)}
        </select>
      </div>
      <div className="col-xs-12 col-sm-6 offset-sm-6 col-md-9 offset-md-4">
        {touched && error && <div className="form-control-feedback text-danger">{error}</div>}
      </div>
    </div>
  );
}

function renderOption(o) {
  const { value, label } = o;
  return <option value={value}>{label}</option>;
}
