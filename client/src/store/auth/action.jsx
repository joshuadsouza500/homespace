//Thunk  is used to handle api calls, so before dispatching the action you might need to async wait for the api call. it is a function that wraps and return a function instead of an action object. The thunk function can receive the dispatch function and getState function as arguments
//eg: export function register(userData) {

import axios from "axios";
import {
  LOGOUT,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionType";
import { API_BASE_URL } from "@/config/apiConfig";

// return function(dispatch) { instwad of having to return a obj it returns a function to handle asycn api
export const signup = (userData) => async (dispatch) => {
  dispatch({ SIGNUP_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch({ SIGNUP_SUCCESS, payload: user.jwt });
  } catch (error) {
    dispatch({ SIGNUP_FAILURE, payload: error.message });
  }
};

export const signin = (userData) => async (dispatch) => {
  dispatch({ SIGNIN_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch({ SIGNIN_SUCCESS, payload: user.jwt });
  } catch (error) {
    dispatch({ SIGNIN_FAILURE, payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ LOGOUT, payload: null });
  localStorage.clear();
};
