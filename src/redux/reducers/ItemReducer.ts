import { ItemActionType } from "../action-types";
import { ItemAction } from "../actions/item-actions";

interface ItemState {
  error: string | null;
  data: Element | null;
  loading: boolean;
  markedForDeletionList: string[] | undefined;
}

const initialState: ItemState = {
  data: null,
  error: null,
  loading: false,
  markedForDeletionList: undefined,
};
const reducer = (
  state: ItemState = initialState,
  action: ItemAction
): ItemState => {
  switch (action.type) {
    case ItemActionType.SEARCH_ITEM:
      return {
        loading: true,
        error: null,
        data: null,
        markedForDeletionList: undefined,
      };
    case ItemActionType.SEARCH_ITEM_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
        markedForDeletionList: undefined,
      };
    case ItemActionType.SEARCH_ITEM_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: null,
        markedForDeletionList: undefined,
      };
    case ItemActionType.REST_ITEM:
      return { loading: false, error: null, data: null,markedForDeletionList:undefined  };
    case ItemActionType.MARKED_FOR_DELETION:
      return { ...state,markedForDeletionList:action.payload  };

    default:
      return state;
  }
};

export default reducer;
