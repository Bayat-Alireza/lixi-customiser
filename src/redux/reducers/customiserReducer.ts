import { CustomizationActionType } from "../action-types";
import { CustomizationAction, SubSchema } from "../actions/customiser-actions";

interface CustomizationState {
  customization: Element | undefined;
  subSchema: SubSchema;
  customHeading?: string;
}

const initialState: CustomizationState = {
  customization: undefined,
  subSchema: { transactionType: undefined, transactionVersion: undefined },
};

const reducer = (
  state: CustomizationState = initialState,
  action: CustomizationAction
): CustomizationState => {
  switch (action.type) {
    case CustomizationActionType.EXCLUDE:
      return { ...state, customization: action.payload };
    case CustomizationActionType.INCLUDE:
      return { ...state, customization: action.payload };
    case CustomizationActionType.CUSTOMIZE_SUB_SCHEMA:
      return { ...state, subSchema: action.payload };
    default:
      return state;
  }
};

export default reducer;
