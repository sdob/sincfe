import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { deleteClub, fetchClubList } from '../clubs/actions';
import Modal from './Modal';
import { hideModal } from './actions';

function DeleteClubModal(props) {
  const { club, goBack } = props;
  console.info(props);
  return (
    <Modal
      confirmIsDangerous
      confirmText="Delete"
      onConfirm={() => {
        // Delete the club, then reload the club list,
        // then hide the modal
        props.deleteClub(club.id)
        .then(props.hideModal)
        .then(() => {
          props.fetchClubList();
          if (goBack) {
            browserHistory.goBack();
          }
        });
      }}
      title={`Really delete ${club.name}?`}
    >
      <p>
        Are you sure you want to go ahead and delete
        this club? All of its members (if any) will
        be assigned to the National club instead.
      </p>
    </Modal>
  );
}

export default connect(null, {
  deleteClub,
  fetchClubList,
  hideModal,
})(DeleteClubModal);
