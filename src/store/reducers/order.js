import * as actionTypes from "../actions/actionTypes";
import { objectAssign } from "../utility";

const initialState = {
  orders: [],
  loadSpinner: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return objectAssign(state, { loadSpinner: true });
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = objectAssign(action.orderData, { id: action.orderId });
      return objectAssign(state, {
        loadSpinner: false,
        orders: state.orders.concat(newOrder)
      });
    case actionTypes.PURCHASE_BURGER_FAIL:
      return objectAssign(state, { loadSpinner: false });
    case actionTypes.FETCH_ORDERS_START:
      return objectAssign(state, { loadSpinner: true });

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return objectAssign(state, {
        orders: action.orderData,
        loadSpinner: false
      });
    case actionTypes.FETCH_ORDERS_FAIL:
      return objectAssign(state, { loadSpinner: false });
    default:
      return state;
  }
};

export default reducer;
