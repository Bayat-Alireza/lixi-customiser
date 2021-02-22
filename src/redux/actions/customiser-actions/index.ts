import { CustomizationActionType } from "../../action-types";

export type SubSchema = {
  transactionType: string | undefined;
  transactionVersion: string | undefined;
};

interface ExcludeItem {
  type: CustomizationActionType.EXCLUDE;
  payload: Element;
}

interface UploadCustomizationAction {
  type: CustomizationActionType.UPLOAD_CUSTOMIZATION;
}
interface UploadSuccessCustomizationAction {
  type: CustomizationActionType.UPLOAD_CUSTOMIZATION_SUCCESS;
  payload: Element;
}
interface UploadErrorCustomizationAction {
  type: CustomizationActionType.UPLOAD_CUSTOMIZATION_ERROR;
  payload: string;
}
interface ResetSubSchemaAction {
  type: CustomizationActionType.RESET_SUB_SCHEMA;
}
interface IncludeItem {
  type: CustomizationActionType.INCLUDE;
  payload: Element;
}

interface CustomizeSubSchema {
  type: CustomizationActionType.CUSTOMIZE_SUB_SCHEMA;
  payload: SubSchema;
}

export type CustomizationAction =
  | UploadCustomizationAction
  | UploadSuccessCustomizationAction
  | UploadErrorCustomizationAction
  | ExcludeItem
  | IncludeItem
  | CustomizeSubSchema
  | ResetSubSchemaAction;
