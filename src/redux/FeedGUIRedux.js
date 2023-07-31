const types = {
    VIEWABLE_ITEMS_CHANGED: "VIEWABLE_ITEMS_CHANGED",
    VIEWABLE_ITEMS_CHANGED: "VIEWABLE_ITEMS_CHANGED",
  };
const initialState = {
    viewableItems: [],
  };

export const actions = {
      onViewableItemsChanged: (viewableItems) => {
        return { type: types.VIEWABLE_ITEMS_CHANGED, viewableItems };
      },
  };



export const reducer = (state = initialState, action) => {
    const { type, viewableItems } = action;

    switch (type) {
        case types.VIEWABLE_ITEMS_CHANGED: {
          return { ...state, viewableItems };
        }
      default:
        return state;
    }
  };
