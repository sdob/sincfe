const initialState = {
  modalType: null,
  modalProps: {},
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      // console.info('caught by reducer');
      // console.info('modalType');
      // console.info(action.modalType);
      // console.info('modalProps');
      // console.info(action.modalProps);
      return {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    case 'HIDE_MODAL':
      console.info('caught HIDE_MODAL');
      return initialState;
    default:
      return state;
  };
}
