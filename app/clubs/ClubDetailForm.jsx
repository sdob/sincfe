import React from 'react';
import { FormRow, InlineSpinner } from '../shared';
import * as fields from './fields';

export default function ClubDetailForm(props) {
  const { club, onSubmit, submitting } = props;
  return (
    <form onSubmit={onSubmit}>
      <h1 className="sinc-page-header">Club details ({club.name})</h1>

      <div className="form-group row">
        <div className="col-xs-6 col-md-3 col-form-label">
          Club name
        </div>
        <div className="col-xs-6 col-md-9">
          <p className="form-control-static">
            {club.name}
          </p>
        </div>
      </div>

      <div className="form-group row">
        <div className="col-xs-6 col-md-3 col-form-label">
          Region
        </div>
        <div className="col-xs-6 col-md-9">
          <p className="form-control-static">
            {club.region.name}
          </p>
        </div>
      </div>

      <FormRow field={fields.DESCRIPTION} label="Description" type="textarea" rows="3" />
      <FormRow required="true" field={fields.CONTACT_NAME} label="Contact name" />
      <FormRow required="true" field={fields.CONTACT_EMAIL} label="Email address" />
      <FormRow required="true" field={fields.CONTACT_PHONE} label="Phone number" />
      <FormRow field={fields.LOCATION} label="Location" type="textarea" rows="3" />
      <FormRow
        field={fields.TRAINING_TIMES}
        label="Training times"
        component="textarea"
        rows="3"
      />

      <div className="row">
        <div className="col-md-9 col-lg-6 offset-md-3 sinc-form__submit-row">
          <button
            className="btn btn-primary"
            disabled={submitting}
            type="submit"
          >
            { submitting ? <InlineSpinner /> : 'Save' }
          </button>
        </div>
      </div>
    </form>
  );
}
