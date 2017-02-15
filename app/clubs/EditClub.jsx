import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { fetchClub, fetchClubMemberList, updateClub } from './actions';
import { FormRow, InlineSpinner, MemberTable, PageLoading } from '../shared';
import { getMemberRoles, roles } from '../profiles';
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
    // This is an ugly hack to avoid a race condition; we don't know
    // whether the club or the profile will arrive first, and we
    // need both in order to check whether the user is an admin.
    // TODO: spread this.
    /*
    const isNewClub = nextProps.club !== this.props.club;
    const isNewProfile = nextProps.profile !== this.props.profile;
    if (isNewProfile && this.props.club) {
      const { club } = this.props;
      const { profile } = nextProps;
      if (roles.isAdministrator(profile)) {
        this.props.fetchClubMemberList(club.id);
      }
    } else if (isNewClub && this.props.profile) {
      const { club } = nextProps;
      const { profile } = this.props;
      if (roles.isAdministrator(profile)) {
        this.props.fetchClubMemberList(club.id);
      }
    }
    */
    const club = this.props.club || nextProps.club;
    const profile = this.props.profile || nextProps.profile;
    if (club && profile) {
      if (roles.isAdministrator(profile)) {
        this.props.fetchClubMemberList(club.id);
      }
    }
  }

  handleFormSubmit(formProps) {
    // Don't send the users list. When linting, ignore the fact that
    // we're not using the variable.
    const { users, ...rest } = formProps; // eslint-disable-line no-unused-vars
    this.props.updateClub(rest);
  }

  render() {
    const { club, handleSubmit, members, profile, submitting } = this.props;
    if (!club) {
      return <PageLoading />;
    }

    return (
      <div>
        <ClubDetailForm
          club={club}
          onSubmit={handleSubmit(this.handleFormSubmit)}
          submitting={submitting}
        />
        {members && (
          <div>
            <h2 className="sinc-section-header">Members</h2>
            <MemberTable
              rows={members}
            />
          </div>
        )}
      </div>
    );
  }
}

EditClub.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { club, memberList } = state.clubs;
  const { profile } = state.profiles;
  return {
    club,
    initialValues: club, // populate form
    members: memberList,
    profile,
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

export default connect(mapStateToProps, {
  fetchClub,
  fetchClubMemberList,
  updateClub,
})(form(EditClub));
