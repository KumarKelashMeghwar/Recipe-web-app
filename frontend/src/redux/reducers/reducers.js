const INIT_STATE = {
  recipes: [],
};

export const selectReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "EMPTY":
      while (state.recipes.length > 0) {
        state.recipes.pop();
      }
      return {
        recipes: [],
      };

    case "SELECT_PRODUCT":
      while (state.recipes.length > 0) {
        state.recipes.pop();
      }
      return {
        recipes: [action.payload],
      };
    default:
      return state;
  }
};
