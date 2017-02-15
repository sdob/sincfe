import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from'./actions';

function Modal(props) {
  const {
    cancelText,
    confirmIsDangerous,
    // confirmAction,
    confirmText,
    hideModal,
    title,
  } = props;

  // closeButton defaults to True
  const closeButton = props.closeButton === undefined ? true : !!props.closeButton;

  // If we're provided with an 'onCancel' action, then perform it when
  // the 'Cancel' button is clicked; otherwise, just close the modal
  const onCancel = props.onCancel ? props.onCancel : hideModal;

  // If we're provided with an 'onConfirm' action, then perform it when
  // the 'OK' button is clicked; otherwise, just close the modal
  const onConfirm = props.onConfirm ? props.onConfirm : hideModal;

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
            {closeButton && (
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={hideModal}
              >
                <i className="fa fa-fw fa-times" />
              </button>
            )}
          </div>
          <div className="modal-body">
            {props.children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary"
              onClick={onCancel}
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
}

export default connect(null, { hideModal })(Modal);
