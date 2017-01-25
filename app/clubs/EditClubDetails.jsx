import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { fetchClub, updateClub } from './actions';
import { FormRow, InlineSpinner, PageLoading } from '../shared';

import * as fields from './fields';

const form = reduxForm({
  form: 'editClubDetails',
});

class EditClubDetails extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const { profile } = this.props;
    if (profile && profile.club) {
      this.retrieveData(profile);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { profile } = this.props;
    if (nextProps.profile !== profile) {
      this.retrieveData(nextProps.profile);
    }
  }

  handleFormSubmit(formProps) {
    // Don't send the users list. When linting, ignore the fact that
    // we're not using the variable.
    const { users, ...rest } = formProps; // eslint-disable-line no-unused-vars
    this.props.updateClub(rest);
  }

  retrieveData(profile) {
    this.props.fetchClub(profile.club.id);
  }

  render() {
    const { club, handleSubmit, sending } = this.props;
    if (!club) {
      return <PageLoading />;
    }

    return (
      <div>

        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
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

          <FormRow field={fields.DESCRIPTION} label="Description" component="textarea" rows="3" />
          <FormRow field={fields.CONTACT_NAME} label="Contact name" />
          <FormRow field={fields.CONTACT_EMAIL} label="Email address" />
          <FormRow field={fields.CONTACT_PHONE} label="Phone number" />
          <FormRow field={fields.LOCATION} label="Location" component="textarea" rows="3" />
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
  const { club, sending } = state.clubs;
  const { profile } = state.profiles;
  return { club, initialValues: club, profile, sending };
}

export default connect(mapStateToProps, { fetchClub, updateClub })(form(EditClubDetails));
