import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from './actions';

/* For now, ignore the accessibility issue with clickable elements. */
/* eslint-disable jsx-a11y/no-static-element-interactions */
function ModalBackdrop(props) {
  return (
    <div
      className="modal-backdrop fade show"
      onClick={props.hideModal}
    />
  );
}
/* eslint-enable jsx-a11y/no-static-element-interactions */

export default connect(null, { hideModal })(ModalBackdrop);
