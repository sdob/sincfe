const initialState = {
  modalType: null,
  modalProps: {},
  showBackdrop: false,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps,
        // SHOW_MODAL actions with no modalType won't cause the backdrop
        // to appear
        showBackdrop: !!action.modalType,
      };
    case 'HIDE_MODAL':
      return initialState;
    default:
      return state;
  }
}
