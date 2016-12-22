import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';

import PageLoading from '../shared/PageLoading';
import UneditableProfileHelp from '../shared/UneditableProfileHelp';
import FormRow from './FormRow';
import * as fields from './fields';

const form = reduxForm({
  form: 'editProfile',
});

/*
 * TODO: we need to handle the logic for actually updating the form (currently
 * the submit button does nothing).
 */

/*
 * This is the presentational component; it should return either
 * the form, a loading indicator, or an error message.
 */
function EditProfile(props) {
  const { profile } = props;

  if (!profile) {
    // TODO: check whether we've experienced an error and let the user
    // know.
    return (<PageLoading />);
  }

  return (
    <div className="container">
      <h1 className="sinc-page-header">Edit profile</h1>
      <p>You can update/edit your CFT membership profile here.</p>

      <h2 className="sinc-section-header">Personal details</h2>
      <form>
        <div className="form-group row">
          <label
            htmlFor="editProfileCftNumber"
            className="col-xs-6 col-md-3 col-form-label"
          >
            CFT number
          </label>
          <div className="col-xs-6 col-md-9">
            <p className="form-control-static">{profile.id}</p>
          </div>
        </div>

        <div className="form-group row">
          <label
            htmlFor="editProfileTitle"
            className="col-sm-6 col-md-3 col-form-label"
          >
            Title
          </label>
          <div className="col-sm-6 col-md-4">
            <select className="form-control">
              <option>Dr</option>
              <option>Miss</option>
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
            </select>
          </div>
        </div>

        <FormRow field={fields.FIRST_NAME} label="First name" />
        <FormRow field={fields.LAST_NAME} label="Last name" />

        <div className="form-group row">
          <label htmlFor={fields.GENDER} className="col-md-3 col-form-label">Gender</label>
          <div className="col-sm-4">
            <select className="form-control">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label
            htmlFor={fields.DATE_OF_BIRTH}
            className="col-xs-6 col-sm-5 col-md-3 col-form-label"
          >
            Date of birth
          </label>
          <div className="col-xs-6 col-sm-7 col-md-9">
            <p className="form-control-static">
              {moment(profile.date_of_birth).format('D MMM Y')}
            </p>
            <UneditableProfileHelp describes="dob" />
          </div>
        </div>

        <div className="form-group row">
          <label
            htmlFor="editProfileMembershipType"
            className="col-xs-6 col-sm-5 col-md-3 col-form-label"
          >
            Membership type
          </label>
          <div className="col-xs-6 col-sm-7 col-md-9">
            <p className="form-control-static">
              {profile.readable_membership_type}
            </p>
            <UneditableProfileHelp />
          </div>
        </div>

        <div className="form-group row">
          <label
            htmlFor="editProfileLastMedical"
            className="col-xs-6 col-sm-5 col-md-3 col-form-label"
          >
            Last medical
          </label>
          <div className="col-xs-6 col-sm-7 col-md-9">
            <p className="form-control-static">
              {profile.last_medical ? 'Ever' : 'Never'}
            </p>
            <UneditableProfileHelp />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="editProfileStatus" className="col-xs-6 col-sm-5 col-md-3 col-form-label">
            Status
          </label>
          <div className="col-xs-6 col-sm-7 col-md-9">
            <p className="form-control-static">
              {profile.current_membership_status}
            </p>
            <UneditableProfileHelp />
          </div>
        </div>

        <h2 className="sinc-section-header">Contact details</h2>

        <FormRow field={fields.EMAIL} label="Email" />
        <FormRow field={fields.PHONE_HOME} label="Phone (home)" />
        <FormRow field={fields.PHONE_MOBILE} label="Phone (mobile)" />
        <FormRow field={fields.ADDRESS} component="textarea" rows="3" label="Address" />
        <FormRow field={fields.NEXT_OF_KIN_NAME} label="Next of kin" />
        <FormRow field={fields.NEXT_OF_KIN_PHONE} label="Next of kin (phone)" />

        <h2 className="sinc-section-header">Mailing</h2>

        <div className="offset-sm-5 offset-md-3">
          <div className="checkbox">
            <label htmlFor={fields.MAILING}>
              <Field name={fields.MAILING} component="input" type="checkbox" /> Subsea Magazine
            </label>
          </div>
        </div>

        {profile.readable_committee_positions.length > 0 && (
          <div>
            <h2 className="sinc-section-header">
              Committee positions
            </h2>

            <div className="offset-sm-5 offset-md-3">
              <ul className="list-group">
                {profile.readable_committee_positions.map((p, i) => (
                  <li key={i + 1} className="list-group-item">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="form-group row">
          <div className="col-sm-5 text-xs-right">
            <button type="button" className="btn btn-primary">Save</button>
          </div>
        </div>

      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
    initialValues: state.auth.profile,
  };
}

export default connect(mapStateToProps)(form(EditProfile));
