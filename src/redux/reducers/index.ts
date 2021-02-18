import { combineReducers } from "redux";

import itemReducer from "./ItemReducer";
import customiserReducer from "./customiserReducer";

const reducers = combineReducers({
  item: itemReducer,
  customizer: customiserReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
