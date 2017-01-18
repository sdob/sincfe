import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import FlashNotification from '../shared/FlashNotification';
import PageLoading from '../shared/PageLoading';
import NotImplementedYet from '../shared/NotImplementedYet';
import { fetchClub, updateClub } from './actions';
import { fetchRegions } from '../regions/actions';
import FormRow from '../shared/FormRow';
import InlineSpinner from '../shared/InlineSpinner';

import * as fields from './fields';
import * as types from './types';

const form = reduxForm({
  form: 'editClubDetails',
});

class EditClubDetails extends Component {

  componentDidMount() {
    const { fetchClub, fetchRegions, profile } = this.props;
    if (profile && profile.club) {
      fetchClub(profile.club.id);
      fetchRegions();
    }
  }

  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchClub, fetchRegions, profile } = this.props;
    if (nextProps.profile !== profile) {
      fetchClub(nextProps.profile.club.id);
      fetchRegions();
    }
  }

  handleFormSubmit(formProps) {
    const { clubs, updateClub } = this.props;
    // Merge the existing (uneditable) data with the
    // contents of our form; this prevents us from
    // having to do a partial update.
    const club = { ...clubs.club, ...formProps };
    updateClub(club);
  }

  render() {
    const { clubs, handleSubmit, profile, regions } = this.props;
    if (!(clubs.club && regions)) {
      return <PageLoading />;
    }

    const { club, sending } = clubs;

    // Try to find a region for this club; if it's missing, call it
    // 'None assigned'
    const region = regions.filter(region => region.id === club.region)[0];
    const regionName = region ? region.name : 'None assigned';

    return (
      <div>

        <FlashNotification
          message="Changes saved!"
          trigger={types.CLUB_UPDATE_SUCCESS}
          status="success"
        />

        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
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
                disabled={sending}
                type="submit"
              >
                { sending ? <InlineSpinner /> : 'Save' }
              </button>
            </div>
          </div>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clubs: state.clubs,
    initialValues: state.clubs.club,
    profile: state.profiles.profile,
    regions: state.regions.regions,
  };
}

export default connect(mapStateToProps, { fetchClub, fetchRegions, updateClub })(form(EditClubDetails));
