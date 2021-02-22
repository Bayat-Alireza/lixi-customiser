import { CustomizationActionType } from "../action-types";
import { CustomizationAction, SubSchema } from "../actions/customiser-actions";

interface CustomizationState {
  customization: Element | undefined;
  loading: boolean;
  error: string | null;
  subSchema: SubSchema | undefined;
  customHeading?: string | undefined;
}

const initialState: CustomizationState = {
  customization: undefined,
  subSchema: { transactionType: undefined, transactionVersion: undefined },
  error:null,
  loading:false
};

const reducer = (
  state: CustomizationState = initialState,
  action: CustomizationAction
): CustomizationState => {
  switch (action.type) {
    case CustomizationActionType.UPLOAD_CUSTOMIZATION:
      return { ...state, customization: undefined,  loading:  true,  error:  null  };
    case CustomizationActionType.UPLOAD_CUSTOMIZATION_SUCCESS:
      return { ...state, customization: action.payload,  loading:  false,  error:  null  };
    case CustomizationActionType.UPLOAD_CUSTOMIZATION_ERROR:
      return { ...state, customization: undefined,  loading:  false,  error:  action.payload  };
    case CustomizationActionType.EXCLUDE:
      return { ...state, customization: action.payload };
    case CustomizationActionType.INCLUDE:
      return { ...state, customization: action.payload };
    case CustomizationActionType.CUSTOMIZE_SUB_SCHEMA:
      return { ...state, subSchema: action.payload };
    case CustomizationActionType.RESET_SUB_SCHEMA:
      return {
        ...state,
        customHeading: undefined,
        subSchema: undefined,
        customization: undefined,
      };
    default:
      return state;
  }
};

export default reducer;
