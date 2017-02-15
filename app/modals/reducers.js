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
        showBackdrop: true,
      };
    case 'HIDE_MODAL':
      return initialState;
    default:
      return state;
  };
}
