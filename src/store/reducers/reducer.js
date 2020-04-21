import * as actionTypes from "../actions";

const INGREDIENT_PRICE = {
  salad: 0.5,
  meat: 1.5,
  cheese: 0.8,
  bacon: 1.2
};

const initialState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0
  },
  totalPrice: 4
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        //deep cloning the ingredients property of the state
        ingredients: {
          ...state.ingredients,
          // dynamically accessing the property
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
      };
    default:
      return state;
  }
};

export default reducer;
