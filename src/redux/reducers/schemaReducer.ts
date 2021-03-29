import { SchemaActionType } from "../action-types";
import { SchemaActions } from "../actions/schema-actions";

interface SchemaState {
  loading: boolean;
  schema: Document | undefined;
  error: string | null;
  metaData: File | undefined;
}

const initialState: SchemaState = {
  error: null,
  loading: false,
  schema: undefined,
  metaData: undefined,
};

const reducer = (
  state: SchemaState = initialState,
  action: SchemaActions
): SchemaState => {
  switch (action.type) {
    case SchemaActionType.UPLOAD_SCHEMA:
      return {
        loading: true,
        schema: undefined,
        metaData: undefined,
        error: null,
      };
    case SchemaActionType.UPLOAD_SCHEMA_SUCCESS:
      return {
        loading: false,
        error: null,
        metaData: action.payload.file,
        schema: action.payload.doc,
      };
    case SchemaActionType.UPLOAD_SCHEMA_ERROR:
      return {
        loading: false,
        schema: undefined,
        metaData: undefined,
        error: action.payload,
      };
    case SchemaActionType.RESET_SCHEMA:
      return {
        loading: false,
        schema: undefined,
        metaData: undefined,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
