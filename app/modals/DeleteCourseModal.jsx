import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { deleteCourse, fetchCourseList } from '../courses/actions';
import Modal from './Modal';
import { hideModal } from './actions';

function DeleteCourseModal(props) {
  const { courseId } = props;
  console.info(props);
  return (
    <Modal
      confirmIsDangerous
      confirmText="Delete"
      onConfirm={() => {
        // Delete the course, then reload the course list,
        // then hide the modal
        props.deleteCourse(courseId)
        .then(props.fetchCourseList)
        .then(props.hideModal)
        .then(() => {
          if (props.goBack) {
            browserHistory.goBack();
          }
        });
      }}
      title={`Really delete Course #${courseId}?`}
    >
      <p>
        Are you sure you want to go ahead and delete
        this course? Everything connected to it will
        be deleted.
      </p>
    </Modal>
  );
}

export default connect(null, {
  deleteCourse,
  fetchCourseList,
  hideModal,
})(DeleteCourseModal);
