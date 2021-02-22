import { ItemActionType } from "../action-types";
// import { master_schema } from "../../assets/LIXI-Master-Schema";
// import * as JsSearch from "js-search";
import { Dispatch } from "redux";
import { 
  // parsedXml, 
  XmlUtil 
} from "../../util/nameSpaces";
import { ItemAction } from "../actions/item-actions";
import { RootState } from "../reducers";

export const searchItem = (item: string) => {
  const lixiItem = (schema: Document): Promise<Element | undefined | null> => {
    return new Promise((resolves, rejects) => {
      const xmlUtile = new XmlUtil(schema);
      if (item) {
        resolves(xmlUtile.getItemByPath(item));
      }
    });
  };
  return async (dispatch: Dispatch<ItemAction>, getState: () => RootState) => {
    
    dispatch({
      type: ItemActionType.SEARCH_ITEM,
    });
    try {
      const sch = getState().schema.schema;;
      if (!sch)  return;;
      const element = (await lixiItem(sch)) as Element;
      dispatch({
        type: ItemActionType.SEARCH_ITEM_SUCCESS,
        payload: element,
      });
    } catch (err) {
      dispatch({
        type: ItemActionType.SEARCH_ITEM_ERROR,
        payload: err.message,
      });
    }
  };
};

export const resetItem = () => {
  return (dispatch: Dispatch<ItemAction>) => {
    dispatch({
      type: ItemActionType.REST_ITEM,
    });
  };
};
