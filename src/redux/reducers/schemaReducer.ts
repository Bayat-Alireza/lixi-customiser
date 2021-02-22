import { SchemaActionType } from "../action-types";
import { SchemaActions } from "../actions/schema-actions";

interface SchemaState {
  loading: boolean;
  schema: Document | undefined;
  error: string | null;
}

const initialState: SchemaState = {
  error: null,
  loading: false,
  schema: undefined,
};

const reducer = (
  state: SchemaState = initialState,
  action: SchemaActions
): SchemaState => {
  switch (action.type) {
    case SchemaActionType.UPLOAD_SCHEMA:
      return { loading: true, schema: undefined, error: null };
    case SchemaActionType.UPLOAD_SCHEMA_SUCCESS:
      return { loading: false, error: null, schema: action.payload };
    case SchemaActionType.UPLOAD_SCHEMA_ERROR:
      return { loading: false, schema: undefined, error: action.payload };
    case SchemaActionType.RESET_SCHEMA:
      return { loading: false, schema: undefined, error: null };
    default:
      return state;
  }
};

export default reducer;
