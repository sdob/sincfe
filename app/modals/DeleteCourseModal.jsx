import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { deleteCourse, fetchCourseList } from '../courses/actions';
import Modal from './Modal';
import {hideModal } from './actions';

function DeleteCourseModal(props) {
  const { courseId, fetchCourseList, hideModal } = props;
  console.info(props);
  return (
    <Modal
      confirmIsDangerous={true}
      confirmText="Delete"
      onConfirm={() => {
        // Delete the course, then reload the course list,
        // then hide the modal
        props.deleteCourse(courseId)
        .then(fetchCourseList)
        .then(hideModal)
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

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  deleteCourse,
  fetchCourseList,
  hideModal,
})(DeleteCourseModal);
