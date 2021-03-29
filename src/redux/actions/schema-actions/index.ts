import { SchemaActionType } from "../../action-types";

interface UploadSchemaAction {
  type: SchemaActionType.UPLOAD_SCHEMA;
}

interface ResetSchemaAction {
  type: SchemaActionType.RESET_SCHEMA;
}

interface UploadSchemaSuccessAction {
  type: SchemaActionType.UPLOAD_SCHEMA_SUCCESS;
  payload: { doc: Document; file: File };
}

interface UploadSchemaErrorAction {
  type: SchemaActionType.UPLOAD_SCHEMA_ERROR;
  payload: string;
}

export type SchemaActions =
  | UploadSchemaAction
  | UploadSchemaSuccessAction
  | UploadSchemaErrorAction
  | ResetSchemaAction;
