import { CustomizationActionType } from "../action-types";
import { CustomizationAction, SubSchema } from "../actions/customiser-actions";
import { Dispatch } from "redux";
import { RootState } from "..";
import { Customiser } from "../../models/Customiser";
import { CustomisedElementType } from "../../models/customisationTypes";

export const excludeItem = (itemPath: string) => {
  return (
    dispatch: Dispatch<CustomizationAction>,
    getState: () => RootState
  ) => {
    const { customization } = getState().customizer;
    const newCustomisaion = new Customiser(customization, itemPath);
    const customisedItem = newCustomisaion.exclude();
    if (customisedItem) {
      dispatch({
        type: CustomizationActionType.EXCLUDE,
        payload: {
          customisedSchema: newCustomisaion.customisation,
          customisedItem: customisedItem,
        },
      });
    }
    
  };
};
export const includeItem = (itemPath: string) => {
  return (
    dispatch: Dispatch<CustomizationAction>,
    getState: () => RootState
  ) => {
    const { customization } = getState().customizer;
    if (!customization) return;
    const newCustomisaion = new Customiser(customization, itemPath);

    newCustomisaion.include();
    dispatch({
      type: CustomizationActionType.INCLUDE,
      payload: newCustomisaion.customisation,
    });
  };
};


export const customiseElement = (
  customisedElement: CustomisedElementType,
  path: string
) => {
  return (
    dispatch: Dispatch<CustomizationAction>,
    getState: () => RootState
  ) => {
    const { customization } = getState().customizer;
    const newCustomisation = new Customiser(customization, path);
    const newCustomisedEle = newCustomisation.customiseElement(
      customisedElement
    );
    if (!newCustomisedEle) return;
    dispatch({
      type: CustomizationActionType.CUSTOMISE_ELEMENT,
      payload: {
        customisedSchema: newCustomisation.customisation,
        customisedItem: newCustomisedEle,
      },
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
          payload: existingCustomization.getElementsByTagName("Customisations")[0],
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

// export const resetBaseSchema = () => {
//   return (dispatch: Dispatch<SchemaActions>) => {
//     try {
//       dispatch({
//         type: SchemaActionType.RESET,
//       });
//     } catch (err) {
//       dispatch({
//         type: SchemaActionType.UPLOAD_ERROR,
//         payload: err.message,
//       });
//     }
//   };
// };