import { combineReducers } from "redux";

import itemReducer from "./ItemReducer";
import customiserReducer from "./customiserReducer";
import SchemaReducer from "./schemaReducer";

const reducers = combineReducers({
  item: itemReducer,
  customizer: customiserReducer,
  schema: SchemaReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
