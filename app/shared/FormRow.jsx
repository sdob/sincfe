import React from 'react';
import { Field } from 'redux-form';

/*
 * A convenience presentational component that takes 'field', 'label'
 * and (optional) 'component' and 'rows' props and returns a div
 * wrapping a redux-form field in Bootstrap classes. It helps cut
 * down on boilerplate in other components.
 */
export default function FormRow(props) {
  const { field } = props;
  return <Field name={field} {...props} component={renderField} />;
}

function renderField({
  field, input, label, required, rows, type, meta: { touched, error }
}) {
  return (
    <div>
      <div className={`form-group row${(touched && error) ? ' has-danger' : ''}`}>
        <div className="col-md-3 col-form-label">
          <label htmlFor={field} className="form-control-label">
            {label}
          </label>
        </div>
        <div className="col-md-9 col-lg-6">
          {type === 'textarea' ? renderTextArea({ field, input, required, rows }) : renderInput({ field, input, required, type })}
          {touched && error && <ErrorMessage error={error} />}
        </div>
      </div>
    </div>
  );
}

function renderInput({ field, input, required, type }) {
  return (
    <input
      {...input}
      name={field}
      className="form-control"
      placeholder={required ? '' : 'Optional'}
      type={type}
    />
  );
}

function renderTextArea({ field, input, required, rows }) {
  return (
    <textarea
      {...input}
      name={field}
      className="form-control"
      placeholder={!required && 'Optional'}
      rows={rows}
    />
  );
}

function ErrorMessage({ error }) {
  return <div className="form-control-feedback text-danger">{error}</div>;
}
