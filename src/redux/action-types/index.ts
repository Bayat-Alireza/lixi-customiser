export enum ItemActionType {
  SEARCH_ITEM = "search_item",
  SEARCH_ITEM_SUCCESS = "search_item_success",
  SEARCH_ITEM_ERROR = "search_item_error",
  REST_ITEM = "resetItem",
}

export enum CustomizationActionType {
  EXCLUDE = "exclude",
  INCLUDE = "include",
  CUSTOMISE_ELEMENT = "customiseElement",
  UPLOAD_CUSTOMIZATION = "uploadCustomization",
  UPLOAD_CUSTOMIZATION_SUCCESS = "uploadCustomizationSuccess",
  UPLOAD_CUSTOMIZATION_ERROR = "uploadCustomizationError",
  RESET_CUSTOMIZATION = "resetCustomization",
  CUSTOMIZE_SUB_SCHEMA = "customizeSubSchema",
  RESET_SUB_SCHEMA = "resetSubSchema",
  OPTIONAL_TO_MANDATORY = "optionalToMandatory",
  CUSTOM_HEADING = "customHeading",
  CUSTOM_MAX_OCCURS = "customMaxOccurs",
  CUSTOM_MIN_OCCURS = "customMinOccurs",
  STRING_TO_LIST = "stringToList",
  CUSTOM_DEFINITION = "definition",
  STRING_TO_PATTERN = "stringToPattern",
  EXCLUDE_SUB_ELEMENTS = "excludeSubElements",
  REMOVE_DESCENDENT_CUSTOMISATION = "removeDescendentCustomisation",
  UPDATE_CUSTOMISATION = "updateCustomisation",
}


export enum SchemaActionType {
  UPLOAD_SCHEMA = "uploadSchema",
  UPLOAD_SCHEMA_SUCCESS = "uploadSchemaSuccess",
  UPLOAD_SCHEMA_ERROR = "uploadSchemaError",
  RESET_SCHEMA = "reset",
}
