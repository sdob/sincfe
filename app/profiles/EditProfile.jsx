import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { PageLoading, SubmitRow, UneditableProfileHelp } from '../shared';

import { updateOwnProfile } from './actions';
import ContactDetails from './ContactDetails';
import PersonalDetails from './PersonalDetails';
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
class EditProfile extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.updateOwnProfile(formProps);
  }

  render() {
    const { handleSubmit, profile, sending } = this.props;

    // TODO: check whether we've experienced an error and let the user
    // know.

    if (!profile) {
      return (<PageLoading />);
    }

    return (
      <div className="container">
        <h1 className="sinc-page-header">Edit profile</h1>
        <p>You can update/edit your CFT membership profile here.</p>

        <h2 className="sinc-section-header">Personal details</h2>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="form-group row">
            <label
              htmlFor="editProfileCftNumber"
              className="col-6 col-md-3 col-form-label"
            >
              CFT number
            </label>
            <div className="col-6 col-md-9">
              <p className="form-control-static">{profile.id}</p>
            </div>
          </div>

          <PersonalDetails />

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
            <label
              htmlFor="editProfileStatus"
              className="col-xs-6 col-sm-5 col-md-3 col-form-label"
            >
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

          <ContactDetails />

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

              <div className="form-group row">
                <div className="offset-sm-5 offset-md-3 col-sm-7 col-md-9">
                  <ul className="list-group">
                    {profile.readable_committee_positions.map(p => (
                      <li key={p.id + 1} className="list-group-item">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <SubmitRow sending={sending} />

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { profile, sending } = state.profiles;
  return {
    profile,
    sending,
    initialValues: state.profiles.profile,
  };
}

export default connect(mapStateToProps, { updateOwnProfile })(form(EditProfile));
