import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { fetchClub, fetchClubMemberList, updateClub } from './actions';
import { FormRow, InlineSpinner, MemberTable, PageLoading } from '../shared';
import { fetchRegionList } from '../regions/';
import ClubDetailForm from './ClubDetailForm';

import * as fields from './fields';
import validate from './validate';

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
    this.props.fetchRegionList();
    const { isAdmin, profile } = this.props;
    const isDiveOfficer = profile && profile.isDiveOfficerOf(clubId);
    if (this.props.isAdmin || isDiveOfficer) {
      this.props.fetchClubMemberList(clubId);
    }
  }

  componentWillReceiveProps(nextProps) {
    // If props are updating, and the user is an admin, then fetch the
    // list of members
    const clubId = this.context.router.params.id;
    if (nextProps.isAdmin !== this.props.isAdmin) {
      if (nextProps.isAdmin) {
        return this.props.fetchClubMemberList(clubId);
      }
    }
    if (nextProps.profile !== this.props.profile) {
      if (nextProps.profile.isDiveOfficerOf(clubId)) {
        this.props.fetchClubMemberList(clubId);
      }
    }
  }

  handleFormSubmit(formProps) {
    // Don't send the users list. When linting, ignore the fact that
    // we're not using the variable.
    const { users, ...rest } = formProps; // eslint-disable-line no-unused-vars
    return this.props.updateClub(rest);
  }

  render() {
    const { club, handleSubmit, isAdmin, members, profile, submitting } = this.props;
    if (!club) {
      return <PageLoading />;
    }

    return (
      <div>
        <h1 className="sinc-page-header">Club details ({club.name})</h1>
        <ClubDetailForm
          club={club}
          onSubmit={handleSubmit(this.handleFormSubmit)}
          submitting={submitting}
        />
        {members && (
          <div>
            <h2 className="sinc-section-header">Members</h2>
            <MemberTable
              isAdmin={isAdmin}
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
  const { regions } = state.regions;
  return {
    club,
    initialValues: formatClub(club), // populate form
    members: memberList,
    profile,
    regions,
  };

  function formatClub(club) {
    if (club) {
      return {
        ...club,
        region: club.region.id,
      };
    }
    return club;
  }
}


export default connect(mapStateToProps, {
  fetchClub,
  fetchClubMemberList,
  fetchRegionList,
  updateClub,
})(form(EditClub));
