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
  isLoading: false,
  error: null,
  jwt: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case SIGNIN_REQUEST:
      return { ...state, isLoading: true, error: null };

    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        jwt: action.payload.jwt, //added .jwt
      };

    case SIGNUP_FAILURE:
    case SIGNIN_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};
