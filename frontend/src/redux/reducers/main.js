import { combineReducers } from "redux";
import { selectReducer } from "./reducers";

const rootReducer = combineReducers({
  selectReducer,
});

export default rootReducer;
