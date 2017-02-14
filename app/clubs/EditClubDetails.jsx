import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { fetchClub, updateClub } from './actions';
import { FormRow, InlineSpinner, PageLoading } from '../shared';
import ClubDetailForm from './ClubDetailForm';

import * as fields from './fields';

const form = reduxForm({
  form: 'editClubDetails',
  validate,
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
    const { club, handleSubmit, submitting } = this.props;
    console.info('form props');
    console.info(this.props);
    if (!club) {
      return <PageLoading />;
    }

    return (
      <ClubDetailForm
        club={club}
        onSubmit={handleSubmit(this.handleFormSubmit)}
        submitting={submitting}
      />
    );
  }
}

function mapStateToProps(state) {
  const { club, sending } = state.clubs;
  const { profile } = state.profiles;
  return { club, initialValues: club, profile, sending };
}

function validate(values) {
  const DEFAULT_REQUIRED = 'This field cannot be blank.';
  const errors = {};
  // Contact name, email, and phone can all be dealt with the same way
  [fields.CONTACT_EMAIL, fields.CONTACT_NAME, fields.CONTACT_PHONE].forEach((field) => {
    if (!values[field]) {
      errors[field] = DEFAULT_REQUIRED;
    }
  });
  return errors;
}

export default connect(mapStateToProps, { fetchClub, updateClub })(form(EditClubDetails));
