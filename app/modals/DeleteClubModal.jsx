import React from 'react';
import { connect } from 'react-redux';

import { deleteClub, fetchClubList } from '../clubs/actions';
import Modal from './Modal';
import { hideModal } from './actions';

function DeleteClubModal(props) {
  const { courseId, fetchClubList, hideModal } = props;
  console.info(props);
  return (
    <Modal
      confirmIsDangerous={true}
      confirmText="Delete"
      onConfirm={() => {
        // Delete the course, then reload the course list,
        // then hide the modal
        props.deleteClub(courseId)
        .then(fetchClubList)
        .then(hideModal);
      }}
      title={`Really delete Club #${courseId}?`}
    >
      <p>
        Are you sure you want to go ahead and delete
        this club? All of its members (if any) will
        be assigned to the National club.
      </p>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  deleteClub,
  fetchClubList,
  hideModal,
})(DeleteClubModal);
