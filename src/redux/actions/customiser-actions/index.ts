import { CustomizationActionType } from "../../action-types";

export type SubSchema = {
  transactionType: string | undefined;
  transactionVersion: string | undefined;
};

interface ExcludeItem {
  type: CustomizationActionType.EXCLUDE;
  payload: Element;
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
  | ExcludeItem
  | IncludeItem
  | CustomizeSubSchema;
