import React from 'react';
import { Field } from 'redux-form';
import moment from 'moment';

import { DatePicker, FormRow, SelectRow, StaticFormRow, SubmitRow } from '../shared';
import { AutosuggestOrMember } from '../profiles';
import * as fields from './fields';

export default function QualificationDetailForm(props) {
  const {
    addNew,
    certificates,
    editable,
    onSubmit,
    qualification,
    submitting,
  } = props;

  return (
    <form onSubmit={onSubmit}>
      {addNew ? (
        <Field
          className="sinc-edit-course-form__organizer"
          component={AutosuggestOrMember}
          name="user"
          label="Member"
        />
      ): (
        <StaticFormRow
          field={fields.USER}
          label="Member"
          value={`${qualification.user.first_name} ${qualification.user.last_name} (CFT# ${qualification.user.id})`}
        />
      )}
      {editable ? (
        <SelectRow
          field={fields.CERTIFICATE}
          label="Certificate"
          options={[
          { label: 'Select certification', value: -1 },
          ...certificates.map(cert => ({ label: cert.name, value: cert.id }))
          ]}
        />
      ) : (
        <StaticFormRow
          field={fields.CERTIFICATE}
          label="Qualification"
          value={qualification.certificate.name}
        />

      )}
      {editable ? (
        <div className="form-group row">
          <label htmlFor={fields.DATE_GRANTED}
            className="col-12 col-md-3 col-form-label"
          >
            Date granted
          </label>
          <div className="col-12 col-md-9 col-lg-6">
            <Field name={fields.DATE_GRANTED} component={DatePicker} />
          </div>
        </div>
      ) : (
        <StaticFormRow
          field={fields.DATE_GRANTED}
          label="Date granted"
          value={moment(date_granted, 'YYYY-MM-DD').format('DD MMMM YYYY')}
        />
      )}
      {editable && <SubmitRow sending={submitting} />}
    </form>
  );
}
