import { ItemActionType } from "../action-types";
import { ItemAction } from "../actions/item-actions";

interface ItemState {
  error: string | null;
  data: Element | null;
  loading: boolean;
}

const initialState: ItemState = {
  data: null,
  error: null,
  loading: false,
};
const reducer = (
  state: ItemState = initialState,
  action: ItemAction
): ItemState => {
  switch (action.type) {
    case ItemActionType.SEARCH_ITEM:
      return { loading: true, error: null, data: null };
    case ItemActionType.SEARCH_ITEM_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ItemActionType.SEARCH_ITEM_ERROR:
      return { loading: false, error: action.payload, data: null };
    case ItemActionType.REST_ITEM:
      return { loading: false, error: null, data: null };

    default:
      return state;
  }
};

export default reducer;
