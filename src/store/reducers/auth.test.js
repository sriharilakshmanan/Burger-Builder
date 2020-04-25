import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("Auth Reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loadSpinner: false
    });
  });
  // pass initial state and action object for AUTH_SUCCESS
  it("should store the token when logged in", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loadSpinner: false
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "idToken",
          userId: "userId"
        }
      )
    ).toEqual({
      token: "idToken",
      userId: "userId",
      error: null,
      loadSpinner: false
    });
  });
});
