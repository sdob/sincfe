function hideModal() {
  return dispatch => dispatch({ type: 'HIDE_MODAL' });
}

function showModal({ modalType, modalProps }) {
  return dispatch => dispatch({
    type: 'SHOW_MODAL',
    modalType,
    modalProps,
  });
}

export {
  hideModal,
  showModal,
};
