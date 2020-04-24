import * as actionTypes from "../actions/actionTypes";
import { objectAssign } from "../../utils/utility";
const INGREDIENT_PRICE = {
  salad: 0.5,
  meat: 1.5,
  cheese: 0.8,
  bacon: 1.2
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  buildingBurger: false
};

const addIngredient = (state, action) => {
  //using the utility function as an alternate approach, will be used extensively in the order reducer.
  const updatedIngredientProps = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = objectAssign(
    state.ingredients,
    updatedIngredientProps
  );

  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
    buildingBurger: true
  };
  return objectAssign(state, updatedState);
};

const removeIngredient = (state, action) => {
  return {
    ...state,
    //deep cloning the ingredients property of the state
    ingredients: {
      ...state.ingredients,
      // dynamically accessing the property
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
    buildingBurger: true
  };
};

const setIngredients = (state, action) => {
  return {
    ...state,
    ingredients: action.ingredients,
    // Resetting the error in case we had an error earlier, to avoid unexpected behaviour
    error: false,
    totalPrice: 4,
    buildingBurger: false
  };
};

const fetchIngredientsFailed = (state) => {
  return {
    ...state,
    error: true
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);

    default:
      return state;
  }
};

export default reducer;
