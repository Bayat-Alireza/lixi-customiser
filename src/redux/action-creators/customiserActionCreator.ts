import { CustomizationActionType } from "../action-types";
import { CustomizationAction, SubSchema } from "../actions/customiser-actions";
import { Dispatch } from "redux";
import { RootState } from "..";
import { Customiser } from "../../models/Customiser";

export const excludeItem = (itemPath: string) => {
  return (
    dispatch: Dispatch<CustomizationAction>,
    getState: () => RootState
  ) => {
    const { customization } = getState().customizer;
    const newCustomisaion = new Customiser(customization);
    newCustomisaion.exclude(itemPath);
    dispatch({
      type: CustomizationActionType.EXCLUDE,
      payload: newCustomisaion.customisation,
    });
  };
};
export const includeItem = (itemPath: string) => {
  return (
    dispatch: Dispatch<CustomizationAction>,
    getState: () => RootState
  ) => {
    const { customization } = getState().customizer;
    if (!customization) return;
    const newCustomisaion = new Customiser(customization);
    // newCustomisaion.exclude(itemPath);
    newCustomisaion.include(itemPath);
    dispatch({
      type: CustomizationActionType.INCLUDE,
      payload: newCustomisaion.customisation,
    });
  };
};

export const customizeSubSchema = (subSchema: SubSchema) => {
  return (
    dispatch: Dispatch<CustomizationAction>,
    getState: () => RootState
  ) => {
    dispatch({
      type: CustomizationActionType.CUSTOMIZE_SUB_SCHEMA,
      payload: subSchema,
    });
  };
};
