import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PageLoading from '../shared/PageLoading';
import NotImplementedYet from '../shared/NotImplementedYet';
import { fetchClub } from './actions';
import { fetchRegions } from '../regions/actions';
import FormRow from '../shared/FormRow';

import * as fields from './fields';

const form = reduxForm({
  form: 'editClubDetails',
});

class ClubDetails extends Component {

  componentDidMount() {
    const { fetchClub, fetchRegions, profile } = this.props;
    if (profile && profile.club) {
      fetchClub(profile.club.id);
      fetchRegions();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchClub, fetchRegions, profile } = this.props;
    if (nextProps.profile !== profile) {
      fetchClub(nextProps.profile.club.id);
      fetchRegions();
    }
  }

  render() {
    const { club, profile, regions } = this.props;
    if (!(club && regions)) {
      return <PageLoading />;
    }

    // Try to find a region for this club; if it's missing, call it
    // 'None assigned'
    const region = regions.filter(region => region.id === club.region)[0];
    const regionName = region ? region.name : 'None assigned';

    return (
      <div>
        <h1 className="sinc-page-header">Club details ({club.name})</h1>
        <div className="form-group row">
          <label className="col-xs-6 col-md-3 col-form-label">
            Club name
          </label>
          <div className="col-xs-6 col-md-9">
            <p className="form-control-static">
              {club.name}
            </p>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-6 col-md-3 col-form-label">
            Region
          </label>
          <div className="col-xs-6 col-md-9">
            <p className="form-control-static">
              {regionName}
            </p>
          </div>
        </div>

        <FormRow field={fields.DESCRIPTION} label="Description" component="textarea" rows="3" />
        <FormRow field={fields.CONTACT_NAME} label="Contact name" />
        <FormRow field={fields.CONTACT_EMAIL} label="Email address" />
        <FormRow field={fields.CONTACT_PHONE} label="Phone number" />
        <FormRow field={fields.LOCATION} label="Location" component="textarea" rows="3" />
        <FormRow field={fields.TRAINING_TIMES} label="Training times" component="textarea" rows="3" />

        <div className="row">
          <div className="col-md-9 col-lg-6 offset-md-3 sinc-form__submit-row">
            <button
              className="btn btn-primary"
              type="button"
            >
              Save
            </button>
          </div>
        </div>

      </div>
    );

    /*

    return (
      <div>


        <div className="form-group row">
          <label htmlFor={fields.DESCRIPTION} className="col-xs-12 col-md-3 col-form-label">
            Description
          </label>
          <div className="col-xs-12 col-md-9">
            <textarea className="form-control" rows="3" />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-12 col-md-3 col-form-label">
            Contact name
          </label>
          <div className="col-xs-12 col-md-9">
            <Field name='contactName' component="input" className="form-control" />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-12 col-md-3 col-form-label">
            Contact email
          </label>
          <div className="col-xs-12 col-md-9">
            <Field name='contactName' component="input" className="form-control" />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-12 col-md-3 col-form-label">
            Contact phone
          </label>
          <div className="col-xs-12 col-md-9">
            <Field name='contactName' component="input" className="form-control" />
          </div>
        </div>
      </div>
    );
    */
  }
}

function mapStateToProps(state) {
  return {
    club: state.clubs.club,
    profile: state.profiles.profile,
    regions: state.regions.regions,
  };
}

export default connect(mapStateToProps, { fetchClub, fetchRegions })(form(ClubDetails));
