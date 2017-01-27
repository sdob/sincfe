import React from 'react';
import { Field } from 'redux-form';

/*
 * A convenience presentational component that takes 'field', 'label'
 * and (optional) 'component' and 'rows' props and returns a div
 * wrapping a redux-form field in Bootstrap classes. It helps cut
 * down on boilerplate in other components.
 */
export default function FormRow(props) {
  const { component, field, label, required, rows } = props;
  return (
    <div className="form-group row">
      <label htmlFor={field} className="col-md-3 col-form-label">
        {label}
      </label>
      <div className="col-md-9 col-lg-6">
        {required && <div className="form-text text-muted">Required.</div>}
        <Field
          name={field}
          component={component === 'textarea' ? renderTextArea : renderInput}
          rows={rows}
          type="text"
        />
      </div>
    </div>
  );
}

function renderInput({ input, type, meta: { touched, error } }) {
  let className="form-control";
  if (error) {
    className = `${className} text-danger}`;
  }
  return (
    <div className={touched && error && 'has-danger'}>
      {touched && error && <ErrorMessage error={error} />}
      <input {...input} className={className} type={type} />
    </div>
  );
}

function renderTextArea({ rows, meta: { touched, error } }) {
  return (
    <div>
      {touched && error && <ErrorMessage error={error} />}
      <textarea className="form-control" rows={rows} />
    </div>
  );
}

function ErrorMessage({ error }) {
  return <div className="form-control-feedback text-danger">{error}</div>;
}
