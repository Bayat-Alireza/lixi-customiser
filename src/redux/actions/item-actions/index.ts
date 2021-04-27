import { ItemActionType } from "../../action-types";

interface SearchItemAction {
  type: ItemActionType.SEARCH_ITEM;
}

interface ResetItemAction {
  type: ItemActionType.REST_ITEM;
}
interface SearchItemSuccessAction {
  type: ItemActionType.SEARCH_ITEM_SUCCESS;
  payload: Element | null;
}
interface SearchItemErrorAction {
  type: ItemActionType.SEARCH_ITEM_ERROR;
  payload: string;
}

interface IMarkForDeletion {
  type: ItemActionType.MARKED_FOR_DELETION;
  payload: string[];
}

export type ItemAction =
  | SearchItemAction
  | SearchItemSuccessAction
  | SearchItemErrorAction
  | ResetItemAction
  | IMarkForDeletion;
