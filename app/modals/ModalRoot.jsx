import React from 'react';
import { connect } from 'react-redux';
import DeleteClubModal from './DeleteClubModal';
import DeleteCourseModal from './DeleteCourseModal';
import DeleteMemberModal from './DeleteMemberModal';
import DeleteQualificationModal from './DeleteQualificationModal';
import * as types from './types';

const MODAL_COMPONENTS = {
  [types.DELETE_COURSE]: DeleteCourseModal,
  [types.DELETE_CLUB]: DeleteClubModal,
  [types.DELETE_MEMBER]: DeleteMemberModal,
  [types.DELETE_QUALIFICATION]: DeleteQualificationModal,
};

function ModalRoot({ modalType, modalProps }) {
  if (!modalType) {
    return null;
  }
  const ModalComponent = MODAL_COMPONENTS[modalType];
  if (!ModalComponent) {
    return null;
  }
  return <ModalComponent {...modalProps} />;
}

export default connect(
  state => state.modal
)(ModalRoot);
