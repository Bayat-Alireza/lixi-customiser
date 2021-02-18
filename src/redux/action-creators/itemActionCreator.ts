import { ItemActionType } from "../action-types";
import { master_schema } from "../../assets/LIXI-Master-Schema";
import * as JsSearch from "js-search";
import { Dispatch } from "redux";
import { parsedXml, XmlUtil } from "../../util/nameSpaces";
import { ItemAction } from "../actions/item-actions";

export const searchItem = (item: string) => {
  const lixiItem = (): Promise<Element | undefined | null> => {
    return new Promise((resolves, rejects) => {
      const xmlUtile = new XmlUtil(parsedXml);
      if (item) {
        resolves(xmlUtile.getItemByPath(item));
      }
    });
  };
  return async (dispatch: Dispatch<ItemAction>) => {
    dispatch({
      type: ItemActionType.SEARCH_ITEM,
    });
    try {
      const element = (await lixiItem()) as Element;
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
