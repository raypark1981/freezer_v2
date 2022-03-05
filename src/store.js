import { createStore, combineReducers } from "redux";
import uiReducer from "./reducers/uiReducer";
import myInfoReducer from "./reducers/myInfo.reducer";

const store = createStore(
  combineReducers({
    uiState: uiReducer,
    myInfoState: myInfoReducer,
  })
);

export default store;
