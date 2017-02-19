import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { deleteMember } from '../profiles/actions';
import Modal from './Modal';
import { hideModal } from './actions';

class DeleteMemberModal extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.handleCheckboxToggle = this.handleCheckboxToggle.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.state = {
      inputChecked: false,
    };
  }

  handleCheckboxToggle(evt) {
    this.setState({ inputChecked: evt.target.checked });
  }

  handleConfirm() {
    const { goBack, member } = this.props;
    this.props.deleteMember(member)
    .then(() => {
      this.props.hideModal();
      if (goBack) {
        browserHistory.goBack();
      }
    });
  }

  render() {
    const { inputChecked } = this.state;
    return (
      <Modal
        confirmIsDangerous
        confirmText="Delete"
        disableConfirmCondition={!inputChecked}
        onConfirm={this.handleConfirm}
        title={'Really delete this member?'}
      >
        <p>
          Are you sure you want to go ahead and delete
          this member? Any existing member data (including
          medical forms, previous renewal orders, and so on)
          will also be deleted forever.
        </p>
        <p>
          You should only do this if you have just created the
          user by mistake.
        </p>
        <p>
          <input type="checkbox" onChange={this.handleCheckboxToggle} />
          I understand that this is a very dangerous idea.
        </p>
      </Modal>
    );
  }
}

export default connect(null, {
  deleteMember,
  hideModal,
})(DeleteMemberModal);
