import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from './actions';

function ModalBackdrop(props) {
  return (
    <div
      className="modal-backdrop fade show"
      onClick={props.hideModal}
    />
  );
}

export default connect(null, { hideModal })(ModalBackdrop);
