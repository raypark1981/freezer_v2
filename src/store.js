import { createStore } from "redux";
import uiReducer from "./reducers/uiReducer";

const store = createStore(uiReducer);

export default store;
