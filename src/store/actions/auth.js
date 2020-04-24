import * as actionTypes from "./actionTypes";
import axios from "axios";
const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

// setTimeout accepts a function reference and not a function invocation here
const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isRegister) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  };

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkU-YxeWthWhdpzPCeXiksOpfZLseSgb8";

  if (!isRegister) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkU-YxeWthWhdpzPCeXiksOpfZLseSgb8";
  }

  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response.data);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("idToken", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(authFail(error.response.data.error.message));
      });
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const idToken = localStorage.getItem("idToken");
    const userId = localStorage.getItem("userId");
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (!idToken || new Date() > expirationDate) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(idToken, userId));
      console.log(
        "Expiration Time :" +
          (expirationDate.getSeconds() - new Date().getSeconds())
      );
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  };
};
