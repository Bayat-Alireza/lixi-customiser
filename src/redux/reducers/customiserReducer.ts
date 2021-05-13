import { CustomizationActionType } from "../action-types";
import { CustomizationAction, SubSchema } from "../actions/customiser-actions";

interface CustomizationState {
  customization: Element | undefined;
  // customisedItem: Element | undefined;
  loading: boolean;
  error: string | null;
  subSchema: SubSchema | undefined;
  // customHeading?: string | undefined;
  metaData: File | undefined;
}

const initialState: CustomizationState = {
  customization: undefined,
  // customisedItem: undefined,
  subSchema: { transactionType: undefined, transactionVersion: undefined },
  error: null,
  loading: false,
  metaData: undefined,
};

const reducer = (
  state: CustomizationState = initialState,
  action: CustomizationAction
): CustomizationState => {
  switch (action.type) {
    case CustomizationActionType.UPLOAD_CUSTOMIZATION:
      return {
        ...state,
        customization: undefined,
        // customisedItem: undefined,
        loading: true,
        error: null,
      };
    case CustomizationActionType.UPLOAD_CUSTOMIZATION_SUCCESS:
      return {
        ...state,
        customization: action.payload.doc,
        // customisedItem: undefined,
        metaData: action.payload.file,
        loading: false,
        error: null,
      };
    case CustomizationActionType.UPLOAD_CUSTOMIZATION_ERROR:
      return {
        ...state,
        customization: undefined,
        metaData: undefined,
        // customisedItem: undefined,
        loading: false,
        error: action.payload,
      };
    case CustomizationActionType.CUSTOMIZE_SUB_SCHEMA:
      return { ...state, subSchema: action.payload };
    case CustomizationActionType.RESET_SUB_SCHEMA:
      return {
        ...state,
        // customHeading: undefined,
        subSchema: undefined,
        customization: undefined,
        // customisedItem: undefined,
      };
    case CustomizationActionType.UPDATE_CUSTOMISATION:
      return {
        ...state,
        customization: action.payload,
      };
    case CustomizationActionType.RESET_CUSTOMIZATION:
      return {
        ...state,
        customization: undefined,
      };

    default:
      return state;
  }
};

export default reducer;
