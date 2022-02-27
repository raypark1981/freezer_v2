import { TOGGLE_RIGHT_MYINFO, ON_OFF_SPINNER } from "../actions/uiAction";

const intialState = {
  right_myinfo_opened: false,
  spiner_on_off: false,
};

const uiReducer = (state = intialState, action) => {
  switch (action.type) {
    case TOGGLE_RIGHT_MYINFO:
      return { ...state, right_myinfo_opened: !state.right_myinfo_opened };
    case ON_OFF_SPINNER:
      return { ...state, spiner_on_off: !state.spiner_on_off };
    default:
      return state;
  }
};

export default uiReducer;
