import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import AutosuggestOrMember from '../profiles';

import {
  DateTimePicker,
  SelectRow,
  SubmitRow,
} from '../shared';
import * as fields from './fields';

export default function CourseDetailForm(props) {
  const {
    certificates,
    onSubmit,
    regions,
  } = props;

  return (
    <form onSubmit={onSubmit}>
      <SelectRow
        className="form-group row"
        field={fields.REGION}
        label="Region"
        options={[
          { label: 'Select region', value: '-1' },
          ...(regions.map(r => ({ label: r.name, value: r.id })))
        ]}
      />
      <SelectRow
        className="form-group row"
        field={fields.CERTIFICATE}
        label="Certificate"
        options={[
          { label: 'Select certification', value: '-1' },
          ...certificates.map(c => ({ label: c.name, value: c.id }))
        ]}
      />
      <div className="form-group row">
        <div className="col-12 col-sm-6 col-md-3">
          <label htmlFor="maximum_participants" className="col-form-label">
            Maximum participants
          </label>
        </div>
        <div className="col-12 col-sm-6 col-md-9 col-lg-3">
          <Field
            name={fields.MAXIMUM_PARTICIPANTS}
            component="input"
            className="form-control"
            aria-describedby="aria-maximum-participants-help"
          />
        </div>
        <div className="col-12 col-md-9 offset-md-3">
          <span className="help-block" id="aria-maximum-participants-help">
            Leave this empty for unlimited participants.
          </span>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-12 col-sm-6 col-md-3">
          <label htmlFor="date" className="col-form-label">
            Date
          </label>
        </div>
        <div className="col-12 col-sm-6 col-md-9 col-lg-6 col-xl-3">
          <Field name={fields.DATETIME} component={DateTimePicker} aria-describedby="aria-date-help" />
        </div>
        <div className="col-12 col-md-9 offset-md-3">
          <span className="help-block" id="aria-date-help">
            Leave this empty for recurring courses.
          </span>
        </div>
      </div>
      <Field
        name="organizer"
        className="sinc-edit-course-form__organizer"
        component={AutosuggestOrMember}
        label="Organizer"
      />
      <div className="form-group row">
        <div className="col-12 col-md-9 offset-md-3">
          <span className="help-block" id="aria-maximum-participants-help">
            Leave this empty if you are organizing this course.
          </span>
        </div>
      </div>

      <SubmitRow />
    </form>
  );
}
