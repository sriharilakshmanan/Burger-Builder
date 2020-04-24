import * as actionTypes from "../actions/actionTypes";
import { objectAssign } from "../../utils/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loadSpinner: false
};

const authStart = (state) => {
  return objectAssign(state, { loadSpinner: true });
};

const authSuccess = (state, action) => {
  return objectAssign(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loadSpinner: false
  });
};

const authFail = (state, action) => {
  return objectAssign(state, { error: action.error, loadSpinner: false });
};

const authLogout = (state) => {
  return objectAssign(state, {
    token: null,
    userId: null
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    default:
      return state;
  }
};

export default reducer;
