import React from 'react';

export default function StaticFormRow(props) {
  const { field, label, value } = props;
  console.info('StaticFormRow props');
  console.info(props);
  return (
    <div className="form-group row">
      <div className="col-12 col-md-3">
        <label htmlFor={field} className="form-control-label">
          {label}
        </label>
      </div>
      <div className="col-12 col-md-9 col-lg-6">
        {value}
      </div>
    </div>
  );
}
