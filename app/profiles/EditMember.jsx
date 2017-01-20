import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import PageLoading from '../shared/PageLoading';
import SubmitRow from '../shared/SubmitRow';
import { fetchMember, updateMember } from './actions';
import ContactDetails from './ContactDetails';
import PersonalDetails from './PersonalDetails';

const form = reduxForm({
  form: 'editMember',
});

class EditMember extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    console.info(this.context.router);
    const uid = this.context.router.params.id;
    this.props.fetchMember(uid);
  }

  handleFormSubmit(formProps) {
    this.props.updateMember(formProps);
  }

  render() {
    console.info(this.props);
    const { handleSubmit, member, sending } = this.props;
    if (!member) {
      return <PageLoading />;
    }

    return (
      <div>
        <h1 className="sinc-page-header">Edit member (CFT # {member.id})</h1>
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

export default connect(mapStateToProps, { fetchMember, updateMember })(form(EditMember));
