import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { deleteQualification, fetchQualifications } from '../qualifications/actions';
import Modal from './Modal';
import {hideModal } from './actions';

function DeleteQualificationModal(props) {
  const { qualification, fetchQualifications, nextView, hideModal } = props;
  console.info(props);
  return (
    <Modal
      confirmIsDangerous={true}
      confirmText="Delete"
      onConfirm={() => {
        // Delete the course, then reload the course list,
        // then hide the modal
        props.deleteQualification(qualification)
        .then(hideModal)
        .then(() => {
          fetchQualifications();
          browserHistory.push(nextView)
        });
      }}
      title={`Really delete this qualification?`}
    >
      <p>
        Are you sure you want to go ahead and delete
        this qualification?
      </p>
    </Modal>
  );
}

export default connect(null, {
  deleteQualification,
  fetchQualifications,
  hideModal,
})(DeleteQualificationModal);
