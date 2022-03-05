import {
  ADD_COUNT_BASKET_RECIPE_WARNING,
  INITIAL_COUNT_BASKET_RECIPE_WARNING,
} from "../actions/myInfo.action";

const initialState = {
  warning: 0,
  recipe: 0,
  basket: 0,
};

const myInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_COUNT_BASKET_RECIPE_WARNING:
      return {
        ...state,
        warning: action.count.warning,
        recipe: action.count.recipe,
        basket: action.count.basket,
      };
    case ADD_COUNT_BASKET_RECIPE_WARNING:
      return {
        ...state,
        warning: !!action.count.warning
          ? state.warning + action.count.warning
          : state.warning,
        recipe: !!action.count.recipe
          ? state.recipe + action.count.recipe
          : state.recipe,
        basket: !!action.count.basket
          ? state.basket + action.count.basket
          : state.basket,
      };
    default:
      return state;
  }
};

export default myInfoReducer;
