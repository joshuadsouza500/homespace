import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
} from "../user/actionType";
import {
  LOGOUT,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
    case SIGNUP_REQUEST:
    case SIGNIN_REQUEST:
      return { ...state, isLoading: true, error: null };

    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        jwt: action.payload, //added .jwt
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload,
      };

    case SIGNUP_FAILURE:
    case SIGNIN_FAILURE:
    case GET_USER_PROFILE_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};
