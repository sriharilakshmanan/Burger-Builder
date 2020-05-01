import { put } from "redux-saga/effects";
import { delay } from "redux-saga/effects";
import * as authActions from "../actions/auth";
import axios from "axios";

export function* logoutSaga(action) {
  yield localStorage.removeItem("idToken");
  yield localStorage.removeItem("userId");
  yield localStorage.removeItem("expirationDate");
  yield put(authActions.logoutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(authActions.logoutInitiate());
}

export function* authUserSaga(action) {
  yield put(authActions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkU-YxeWthWhdpzPCeXiksOpfZLseSgb8";

  if (!action.isRegister) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkU-YxeWthWhdpzPCeXiksOpfZLseSgb8";
  }

  try {
    const response = yield axios.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("idToken", response.data.idToken);
    yield localStorage.setItem("userId", response.data.localId);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield put(
      authActions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(authActions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(authActions.authFail(error.response.data.error.message));
  }
}

export function* authCheckStateSaga(action) {
  const idToken = yield localStorage.getItem("idToken");
  const userId = yield localStorage.getItem("userId");
  const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
  if (!idToken || new Date() > expirationDate) {
    yield put(authActions.logoutInitiate());
  } else {
    yield put(authActions.authSuccess(idToken, userId));
    yield put(
      authActions.checkAuthTimeout(
        (expirationDate.getTime() - new Date().getTime()) / 1000
      )
    );
  }
}
