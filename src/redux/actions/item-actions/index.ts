import { ItemActionType } from "../../action-types";

interface SearchItemAction {
  type: ItemActionType.SEARCH_ITEM;
}
interface SearchItemSuccessAction {
  type: ItemActionType.SEARCH_ITEM_SUCCESS;
  payload: Element | null;
}
interface SearchItemErrorAction {
  type: ItemActionType.SEARCH_ITEM_ERROR;
  payload: string;
}

export type ItemAction =
  | SearchItemAction
  | SearchItemSuccessAction
  | SearchItemErrorAction;
