import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { fetchClub, updateClub } from './actions';
import { FormRow, InlineSpinner, PageLoading } from '../shared';
import ClubDetailForm from './ClubDetailForm';

import * as fields from './fields';

const form = reduxForm({
  form: 'editClub',
  validate,
});

class EditClub extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const clubId = this.context.router.params.id;
    this.props.fetchClub(clubId);
  }

  componentWillReceiveProps(nextProps) {
  }

  handleFormSubmit(formProps) {
    // Don't send the users list. When linting, ignore the fact that
    // we're not using the variable.
    const { users, ...rest } = formProps; // eslint-disable-line no-unused-vars
    this.props.updateClub(rest);
  }

  render() {
    const { club, handleSubmit, submitting } = this.props;
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

EditClub.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { club } = state.clubs;
  return {
    club,
    initialValues: club, // populate form
  };
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

export default connect(mapStateToProps, { fetchClub, updateClub })(form(EditClub));
