import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { DeleteButton, PageLoading, SubmitRow } from '../shared';
import { showModal } from '../modals';
import { fetchMember, updateMember } from './actions';
import ContactDetails from './ContactDetails';
import PersonalDetails from './PersonalDetails';
import validate from './validate';

const form = reduxForm({
  form: 'editMember',
  validate,
});

class EditMember extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const uid = this.context.router.params.id;
    this.props.fetchMember(uid);
  }

  handleDelete() {
    const { member } = this.props;
    this.props.showModal({
      modalType: 'DELETE_MEMBER',
      modalProps: {
        goBack: true,
        member,
      },
    });
  }

  handleFormSubmit(formProps) {
    this.props.updateMember(formProps);
  }

  render() {
    const { handleSubmit, member, roles: { isAdmin }, sending } = this.props;
    if (!member) {
      return <PageLoading />;
    }

    return (
      <div>
        <h1 className="sinc-page-header d-flex justify-content-between">
          Edit member (CFT # {member.id})
          {isAdmin && (
            <DeleteButton compact={false} onClick={this.handleDelete} />
          )}
        </h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <h2 className="sinc-section-header">Personal details</h2>
          <PersonalDetails />
          <h2 className="sinc-section-header">Contact details</h2>
          <ContactDetails />
          <SubmitRow sending={sending} />
        </form>
      </div>
    );
  }
}

EditMember.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { member, sending } = state.profiles;
  return {
    member,
    initialValues: state.profiles.member,
    sending,
  };
}

export default connect(mapStateToProps, {
  fetchMember,
  showModal,
  updateMember,
})(form(EditMember));
