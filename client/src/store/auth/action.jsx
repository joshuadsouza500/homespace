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
import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
} from "../user/actionType";

// return function(dispatch) { instwad of having to return a obj it returns a function to handle asycn api
export const signup = (userData) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    console.log("signed up user", user);
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch({ type: SIGNUP_SUCCESS, payload: user.jwt });
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.response });
  }
};

//better for redirecting user after signin and to get userprofile immediately as it adds the jwt to header
export const signin = (userData) => async (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    console.log("dddfdsa", user);
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch({ type: SIGNIN_SUCCESS, payload: user.jwt });
  } catch (error) {
    dispatch({ type: SIGNIN_FAILURE, payload: error.response });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.clear();
  console.log("user logged out");
};

//It relies on the JWT stored in localStorage when the api instance was created. If the JWT in localStorage changes after the api instance is created, the api instance won't automatically use the updated JWT.

export const getUserProfile = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;

    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: user });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
  }
};
