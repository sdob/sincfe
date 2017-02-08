import React from 'react';
import { connect } from 'react-redux';
import DeleteCourseModal from './DeleteCourseModal';
import * as types from './types';

const MODAL_COMPONENTS = {
  [types.DELETE_COURSE]: DeleteCourseModal,
};

function ModalRoot({ modalType, modalProps }) {
  if (!modalType) {
    return null;
  }
  // console.info('i should show something');
  const ModalComponent = MODAL_COMPONENTS[modalType];
  // console.info(ModalComponent);
  return <ModalComponent {...modalProps} />;
}

export default connect(
  state => state.modal
)(ModalRoot);
