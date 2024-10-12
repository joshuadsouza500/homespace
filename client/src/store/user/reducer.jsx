import {
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROPERTIES_FAILURE,
  GET_USER_PROPERTIES_REQUEST,
  GET_USER_PROPERTIES_SUCCESS,
  GET_USER_SAVED_PROPERTIES_FAILURE,
  GET_USER_SAVED_PROPERTIES_REQUEST,
  GET_USER_SAVED_PROPERTIES_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
} from "./actionType";

const initialState = {
  user: null,
  property: null,
  savedProperty: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
    case UPDATE_USER_PROFILE_REQUEST:
    case GET_USER_PROPERTIES_REQUEST:
    case GET_USER_SAVED_PROPERTIES_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_USER_PROFILE_SUCCESS:
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case GET_USER_PROPERTIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        property: action.payload,
      };
    case GET_USER_SAVED_PROPERTIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        savedProperty: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: null, // Optionally set user to null if you want to clear it
      };

    case GET_USER_PROFILE_FAILURE:
    case UPDATE_USER_PROFILE_FAILURE:
    case GET_USER_PROPERTIES_FAILURE:
    case GET_USER_SAVED_PROPERTIES_FAILURE:
    case DELETE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
