import React from 'react';

export default function CourseDetailRow(props) {
  return (
    <div className="row">
      <p className="col-md-3">
        {props.label}
      </p>
      <p className="col-md-9">
        {props.value || props.children}
      </p>
    </div>
  );
}
