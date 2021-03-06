import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { fetchClub, fetchClubMemberList, updateClub } from './actions';
import { DeleteButton, MemberTable, PageLoading } from '../shared';
import { fetchRegionList } from '../regions/';
import { showModal } from '../modals';
import ClubDetailForm from './ClubDetailForm';

import validate from './validate';

const form = reduxForm({
  form: 'editClub',
  validate,
});

class EditClub extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const clubId = this.context.router.params.id;
    this.props.fetchClub(clubId);
    this.props.fetchRegionList();
    const { profile, roles: { isAdmin } } = this.props;
    const isDiveOfficer = profile && profile.isDiveOfficerOf(clubId);
    if (isAdmin || isDiveOfficer) {
      this.props.fetchClubMemberList(clubId);
    }
  }

  componentWillReceiveProps(nextProps) {
    // If props are updating, and the user is an admin or a DO, then fetch the
    // list of members
    const clubId = this.context.router.params.id;
    if (
      nextProps.roles !== this.props.roles ||
      nextProps.roles !== this.props.profile
    ) {
      if (
        nextProps.roles.isAdmin ||
        nextProps.profile.isDiveOfficerOf(clubId)
      ) {
        this.props.fetchClubMemberList(clubId);
      }
    }
  }

  handleDelete() {
    const { club } = this.props;
    this.props.showModal({
      modalType: 'DELETE_CLUB',
      modalProps: { club, goBack: true },
    });
  }

  handleFormSubmit(formProps) {
    // Don't send the users list. When linting, ignore the fact that
    // we're not using the variable.
    const { users, ...rest } = formProps; // eslint-disable-line no-unused-vars
    return this.props.updateClub(rest);
  }

  render() {
    const { club, handleSubmit, members, roles, submitting } = this.props;
    if (!club) {
      return <PageLoading />;
    }

    return (
      <div>
        <h1 className="sinc-page-header d-flex justify-content-between">
          Club details ({club.name})
          {roles.isAdmin && (
            <DeleteButton compact={false} onClick={this.handleDelete} />
          )}
        </h1>
        <ClubDetailForm
          club={club}
          onSubmit={handleSubmit(this.handleFormSubmit)}
          submitting={submitting}
        />
        {members && (
          <div>
            <h2 className="sinc-section-header">Members</h2>
            <MemberTable
              roles={roles}
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
    initialValues: formatClub(), // populate form
    members: memberList,
    profile,
    regions,
  };

  function formatClub() {
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
  showModal,
  updateClub,
})(form(EditClub));
