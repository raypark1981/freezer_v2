export const ADD_COUNT_BASKET_RECIPE_WARNING =
  "ADD_COUNT_BASKET_RECIPE_WARNING";
export const INITIAL_COUNT_BASKET_RECIPE_WARNING =
  "INITIAL_COUNT_BASKET_RECIPE_WARNING";

const addCountBasketRecipeWarning = (count) => {
  return {
    type: ADD_COUNT_BASKET_RECIPE_WARNING,
    count,
  };
};

const initialCountBasketRecipeWarning = (count) => {
  return {
    type: INITIAL_COUNT_BASKET_RECIPE_WARNING,
    count,
  };
};

export const myInfoActionCreator = {
  addCountBasketRecipeWarning,
  initialCountBasketRecipeWarning,
};
