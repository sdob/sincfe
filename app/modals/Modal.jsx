import React from 'react';
import { connect } from 'react-redux';

function Modal(props) {
  const {
    cancelText,
    confirmIsDangerous,
    // confirmAction,
    confirmText,
    title,
  } = props;

  // If we're provided with an 'onCancel' action, then perform it when
  // the 'Cancel' button is clicked; otherwise, just close the modal
  const onCancel = props.onCancel ? props.onCancel : closeModal;

  // If we're provided with an 'onConfirm' action, then perform it when
  // the 'OK' button is clicked; otherwise, just close the modal
  const onConfirm = props.onConfirm ? props.onConfirm : closeModal;

  return (
    <div
      className="modal show sinc-modal"
      id="myModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-hidden="true"
      data-show="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{props.title}</h5>
          </div>
          <div className="modal-body">
            {props.children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary"
              onClick={() => onCancel()}
            >
              {cancelText ? cancelText : 'Cancel'}
            </button>
            <button type="button"
              className={`btn ${confirmIsDangerous ? 'btn-danger' : 'btn-primary'}`}
              onClick={() => onConfirm()}
            >
              {confirmText ? confirmText : 'OK'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // This is the default behaviour when the 'Cancel' button is clicked:
  // dispatch an action to close the modal
  function closeModal() {
    props.dispatch({ type: 'HIDE_MODAL' });
  }
}

export default connect()(Modal);
