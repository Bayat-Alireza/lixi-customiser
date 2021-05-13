import { CustomizationActionType } from "../action-types";
import { CustomizationAction, SubSchema } from "../actions/customiser-actions";
import { Dispatch } from "redux";
import { RootState } from "..";


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

export const resetCustomizeSubSchema = () => {
  return (
    dispatch: Dispatch<CustomizationAction>,
    getState: () => RootState
  ) => {
    dispatch({
      type: CustomizationActionType.RESET_SUB_SCHEMA,
    });
  };
};
export const resetCustomization = () => {
  return (
    dispatch: Dispatch<CustomizationAction>,
    getState: () => RootState
  ) => {
    dispatch({
      type: CustomizationActionType.RESET_CUSTOMIZATION,
    });
  };
};

export const uploadExistingCustomization = (file: File) => {
  const readExistingCustomization = (): Promise<ArrayBuffer | string | null> => {
    return new Promise((resolves, rejects) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolves(reader.result);
      };
      reader.onerror = rejects;
      reader.readAsText(file);
    });
  };

  const parsExistingCustomization = (customization: string): Promise<Document> => {
    return new Promise((resolves, rejects) => {
      const parser = new DOMParser();
      const parsedCustomization = parser.parseFromString(
        customization,
        "text/xml"
      );
      resolves(parsedCustomization);
    });
  };

  return async (dispatch: Dispatch<CustomizationAction>) => {
    dispatch({
      type: CustomizationActionType.UPLOAD_CUSTOMIZATION,
    });
    try {
      const existingSchema = await readExistingCustomization();
      if (existingSchema) {
        const existingCustomization = await parsExistingCustomization(existingSchema?.toString());
        dispatch({
          type: CustomizationActionType.UPLOAD_CUSTOMIZATION_SUCCESS,
          payload: {
            doc: existingCustomization.getElementsByTagName(
              "Customisations"
            )[0],
            file: file,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: CustomizationActionType.UPLOAD_CUSTOMIZATION_ERROR,
        payload: err.message,
      });
    }
  };
};

export const updateCustomisation = (customisation: Element) => {
  return (dispatch: Dispatch<CustomizationAction>) => {
    dispatch({
      type: CustomizationActionType.UPDATE_CUSTOMISATION,
      payload: customisation,
    });
  };
};