export enum ItemActionType {
  SEARCH_ITEM = "search_item",
  SEARCH_ITEM_SUCCESS = "search_item_success",
  SEARCH_ITEM_ERROR = "search_item_error",
}

export enum CustomizationActionType {
  EXCLUDE = "exclude",
  INCLUDE = "include",
  CUSTOMIZE_SUB_SCHEMA = "customizeSubSchema",
  OPTIONAL_TO_MANDATORY = "optionalToMandatory",
  CUSTOM_HEADING = "customHeading",
  CUSTOM_MAX_OCCURS = "customMaxOccurs",
  CUSTOM_MIN_OCCURS = "customMinOccurs",
  STRING_TO_LIST = "stringToList",
  CUSTOM_DEFINITION = "definition",
  STRING_TO_PATTERN = "stringToPattern",
  EXCLUDE_SUB_ELEMENTS = "excludeSubElements",
}
