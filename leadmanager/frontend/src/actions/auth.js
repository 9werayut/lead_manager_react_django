import axios from "axios";
import { returnErrors } from "./messages";
import { headers } from "./helper";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

//CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", headers(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

//LOGIN USER
export const login = (username, password) => dispatch => {
  //Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, headers())
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: LOGIN_FAIL });
    });
};

//REGISTER USER
export const register = ({ username, password, email }) => dispatch => {
  //Request Body
  const body = JSON.stringify({ username, password, email });

  axios
    .post("/api/auth/register", body, headers())
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: REGISTER_FAIL });
    });
};

// LOGOUT
export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout/", null, headers(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
