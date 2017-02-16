import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { FormRow, InlineSpinner, PageLoading, SelectRow, StaticFormRow, SubmitRow } from '../shared';
import * as fields from './fields';

function ClubDetailForm(props) {
  const { isAdmin, club, onSubmit, regions, submitting } = props;

  if (!regions) {
    return <PageLoading />;
  }

  const regionOptions = [
    { label: 'Select Region', value: -1 },
    ...regions.map(region => ({
      label: region.name,
      value: region.id,
    })),
  ];

  return (
    <form className="sinc-club-detail-form" onSubmit={onSubmit}>

      {isAdmin ? renderEditableNameAndRegion() : renderUneditableNameAndRegion(club)}

      <FormRow required field={fields.CONTACT_NAME} label="Contact name" />
      <FormRow required field={fields.CONTACT_EMAIL} label="Email address" />
      <FormRow required field={fields.CONTACT_PHONE} label="Phone number" />
      <FormRow field={fields.DESCRIPTION} label="Description" type="textarea" rows="3" />
      <FormRow field={fields.LOCATION} label="Location" type="textarea" rows="3" />
      <FormRow
        field={fields.TRAINING_TIMES}
        label="Training times"
        component="textarea"
        rows="3"
      />
      <SubmitRow sending={submitting} />
    </form>
  );

  function renderEditableNameAndRegion() {
    return (
      <div>
        <FormRow label="Name" field="name" required />
        <SelectRow field="region" label="Region" options={regionOptions} />
      </div>
    );
  }

  function renderUneditableNameAndRegion(club) {
    return (
      <div>
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { regions } = state.regions;
  return {
    regions,
  };
}

export default connect(mapStateToProps)(ClubDetailForm);
