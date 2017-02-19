import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { AutosuggestOrMember } from '../profiles';

import {
  DateTimePicker,
  PageLoading,
  SelectRow,
  SubmitRow,
} from '../shared';
import * as fields from './fields';

function CourseDetailForm(props) {
  const {
    certificates,
    onSubmit,
    regions,
    submitting,
  } = props;

  // Don't display the form until we have regions and certificates
  if (!(regions && certificates)) {
    return <PageLoading />;
  }

  // Format the certificates in the way that SelectRow expects
  const certificateOptions = [
    { label: 'Select certification', value: '-1' },
    ...certificates.map(c => ({ label: c.name, value: c.id }))
  ];

  // Format the regions in the way that SelectRow expects
  const regionOptions = [
    { label: 'Select region', value: '-1' },
    ...(regions.map(r => ({ label: r.name, value: r.id })))
  ];

  return (
    <form onSubmit={onSubmit}>
      <SelectRow
        className="form-group row"
        field={fields.REGION}
        label="Region"
        options={regionOptions}
      />
      <SelectRow
        className="form-group row"
        field={fields.CERTIFICATE}
        label="Certification"
        options={certificateOptions}
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
          <Field
            name={fields.DATETIME}
            component={DateTimePicker}
            aria-describedby="aria-date-help"
          />
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

      <SubmitRow sending={submitting} />
    </form>
  );
}

function mapStateToProps(state) {
  const { certificates } = state.courses;
  const { regions } = state.regions;
  return {
    certificates,
    regions,
  };
}

export default connect(mapStateToProps)(CourseDetailForm);
