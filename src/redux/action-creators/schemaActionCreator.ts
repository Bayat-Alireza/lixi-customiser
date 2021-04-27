import { SchemaActionType } from "../action-types";
// import { master_schema } from "../../assets/LIXI-Master-Schema";
// import * as JsSearch from "js-search";
import { Dispatch } from "redux";
// import { parsedXml, XmlUtil } from "../../util/nameSpaces";
import { SchemaActions } from "../actions/schema-actions";
import { RootState } from "../reducers";
// import { render } from "@testing-library/react";

export const uploadBaseSchema = (file: File) => {
  const readBaseSchema = (): Promise<ArrayBuffer | string | null> => {
    return new Promise((resolves, rejects) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolves(reader.result);
      };
      reader.onerror = rejects;
      reader.readAsText(file);
    });
  };

  const parsBaseSchema = (baseSchema: string): Promise<Document> => {
    return new Promise((resolves, rejects) => {
      const parser = new DOMParser();
      const parsedBaseSchema = parser.parseFromString(baseSchema, "text/xml");
      resolves(parsedBaseSchema);
    });
  };

  return async (
    dispatch: Dispatch<SchemaActions>,
    getState: () => RootState
  ) => {
    dispatch({
      type: SchemaActionType.UPLOAD_SCHEMA,
    });
    try {
      const baseSchema = await readBaseSchema();
      if (baseSchema) {
        const schema = await parsBaseSchema(baseSchema?.toString());
        dispatch({
          type: SchemaActionType.UPLOAD_SCHEMA_SUCCESS,
          payload: { doc: schema, file: file },
        });
      }
    } catch (err) {
      dispatch({
        type: SchemaActionType.UPLOAD_SCHEMA_ERROR,
        payload: err.message,
      });
    }
  };
};

export const resetBaseSchema = () => {
  return (dispatch: Dispatch<SchemaActions>) => {
    try {
      dispatch({
        type: SchemaActionType.RESET_SCHEMA,
      });
    } catch (err) {
      dispatch({
        type: SchemaActionType.UPLOAD_SCHEMA_ERROR,
        payload: err.message,
      });
    }
  };
};
